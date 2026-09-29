const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

function loader(mocks = {}) {
  const cache = new Map()
  function load(filename) {
    filename = path.resolve(__dirname, '..', filename)
    if (cache.has(filename)) return cache.get(filename).exports
    const module = { exports: {} }
    cache.set(filename, module)
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    }).outputText
    const requireLocal = id => {
      if (id in mocks) return mocks[id]
      if (id.endsWith('?raw')) return '/* print styles */'
      if (id.endsWith('html-document.js')) return { buildFullHtmlDocument: () => '' }
      return load(path.resolve(path.dirname(filename), id + '.ts'))
    }
    new Function('require', 'module', 'exports', 'window', code)(requireLocal, module, module.exports, {})
    return module.exports
  }
  return load
}
const plugin = (id, label = id) => ({ id, name: id, icon: '', fields: [{ key: 'name', label }], sampleData: {}, color: '' })

test('global registrations are copied and invalid plugin updates preserve existing plugins', () => {
  const { registerPlugin, createPluginRegistry } = loader()('src/core/pluginRegistry.ts')
  registerPlugin(plugin('warehouse'))
  const registry = createPluginRegistry([plugin('builtin')])
  assert.equal(registry.get('warehouse').id, 'warehouse')
  registry.syncExternal([plugin('tenant')])
  assert.throws(() => registry.syncExternal([plugin('valid'), plugin('builtin')]))
  assert.ok(registry.get('tenant'))
  assert.equal(registry.get('valid'), undefined)
  assert.throws(() => registry.syncExternal([plugin('duplicate'), plugin('duplicate')]))
})

test('two adapters isolate element definitions and export portable templates', async () => {
  const groups = new Map()
  const context = {
    removePrintElementTypes: key => groups.delete(key),
    addPrintElementTypes: (key, value) => groups.set(key, value),
  }
  const instances = []
  const hiprint = {
    init: ({ providers }) => providers.forEach(p => p.addElementTypes(context)),
    setConfig() {},
    PrintElementTypeGroup: function (name, fields) { this.fields = fields },
    PrintElementTypeManager: { build() {}, remove: key => groups.delete(key) },
    PrintTemplate: function (options) {
      this.options = options
      this.design = () => {}
      this.getJson = () => options.template
      this.destroy = () => { this.destroyed = true }
      this.clientIsOpened = () => false
      this.print2 = () => { this.sent = true }
      instances.push(this)
    },
  }
  const load = loader({ jquery: () => ({ empty() {} }), '@hiprint-engine': { hiprint } })
  const { createPluginRegistry } = load('src/core/pluginRegistry.ts')
  const { HiprintAdapter } = load('src/engine/hiprintAdapter.ts')
  const template = { panels: [{ printElements: [{ tid: 'business.same.name', options: { field: 'business.same.name' } }] }] }
  const make = label => new HiprintAdapter(undefined, { template, registry: createPluginRegistry([plugin('same', label)]) })
  const first = make('first'), second = make('second')
  first.mount('a', 'b', 'c', 'd')
  second.mount('e', 'f', 'g', 'h')
  assert.equal(groups.size, 2)
  const fields = [...groups.values()].map(group => group[0].fields[0])
  assert.notEqual(fields[0].tid, fields[1].tid)
  assert.deepEqual(fields.map(f => f.title), ['first', 'second'])
  first.refreshPlugins()
  assert.equal(groups.size, 2)
  assert.deepEqual(first.getTemplate(), template)
  assert.deepEqual(second.getTemplate(), template)
  await assert.rejects(first.silentPrint({}), /未连接/)
  assert.equal(instances[0].sent, undefined)
  instances[0].clientIsOpened = () => true
  await first.silentPrint({})
  assert.equal(instances[0].sent, true)
  first.destroy()
  first.destroy()
  assert.equal(groups.size, 1)
  assert.equal(instances[0].destroyed, true)
  assert.equal(instances[1].destroyed, undefined)
  await assert.rejects(first.silentPrint({}), /尚未初始化/)
  second.destroy()
  assert.equal(groups.size, 0)
})

const engine = fs.readFileSync(path.resolve(__dirname, '../../vue-plugin-hiprint/src/hiprint/hiprint.bundle.js'), 'utf8')
function engineMethod(name, scope) {
  const marker = `t.prototype.${name} = `
  const start = engine.indexOf(marker) + marker.length
  const end = engine.indexOf(', t.prototype.', start)
  return vm.runInNewContext('(' + engine.slice(start, end) + ')', scope)
}

test('engine printing propagates failure and returns the inline-style send result', async () => {
  const print2 = engineMethod('print2', { $: () => ({ length: 0 }), i18n: { __: text => text } })
  const context = { clientIsOpened: () => false }
  assert.throws(() => print2.call(context, {}), /连接客户端失败/)
  context.clientIsOpened = () => true
  context.sentToClient = async (css, data) => {
    assert.equal(css, '<style>test</style>')
    assert.equal(data.order, 42)
    return 'queued'
  }
  assert.equal(await print2.call(context, { order: 42 }, { styleHandler: () => '<style>test</style>' }), 'queued')
  context.sentToClient = () => Promise.reject(new Error('socket failure'))
  await assert.rejects(print2.call(context, {}, { styleHandler: () => 'css' }), /socket failure/)
})

test('undo affects only the focused template and repeated binding does not add handlers', () => {
  const handlers = new Map(), calls = [], document = {}
  const $ = target => target === document ? {
    off(key) { handlers.delete(key); return this },
    on(key, handler) { handlers.set(key, handler); return this },
  } : { closest: () => ({ length: target.editable ? 1 : 0 }) }
  const bind = engineMethod('bindShortcutKeyEvent', {
    $, document,
    s: { a: { instance: { getPrintTemplateById: id => ({ container: [{ contains: target => target.owner === id }] }) } } },
    o: { a: { event: { trigger: (...args) => calls.push(args) } } },
  })
  bind.call({ templateId: 'one' })
  bind.call({ templateId: 'one' })
  bind.call({ templateId: 'two' })
  assert.equal(handlers.size, 2)
  for (const handler of handlers.values()) handler({ target: { owner: 'one' }, ctrlKey: true, keyCode: 90, preventDefault() {} })
  assert.deepEqual(calls, [['hiprintTemplateDataShortcutKey_one', 'undo']])
  for (const handler of handlers.values()) handler({ target: { owner: 'one', editable: true }, ctrlKey: true, keyCode: 90 })
  assert.equal(calls.length, 1)
})

test('engine event cleanup removes only events owned by the destroyed template', () => {
  const start = engine.indexOf('hinnn.event = (i = {}, {')
  const end = engine.indexOf('}), hinnn.form', start)
  const scope = { hinnn: {}, eventOwners: {} }
  vm.runInNewContext('var i; ' + engine.slice(start, end) + '});', scope)
  const bus = scope.hinnn.event
  let first = 0, second = 0
  bus.on('changed_one', () => first++)
  bus.on('changed_two', () => second++)
  bus.on('updateTable_old', () => first++, 'one')
  bus.clearTemplate('one')
  bus.trigger('changed_one')
  bus.trigger('updateTable_old')
  bus.trigger('changed_two')
  assert.equal(first, 0)
  assert.equal(second, 1)
})
