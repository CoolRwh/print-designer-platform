import type { BusinessField, BusinessPlugin } from './types'

export class PluginRegistry {
  private plugins = new Map<string, BusinessPlugin>()
  private externalPluginIds = new Set<string>()
  private builtinPluginIds = new Set<string>()

  register(plugin: BusinessPlugin) {
    if (this.plugins.has(plugin.id)) throw new Error(`插件 ${plugin.id} 已注册`)
    this.plugins.set(plugin.id, plugin)
    return this
  }

  registerBuiltIn(plugin: BusinessPlugin) {
    if (this.plugins.has(plugin.id)) throw new Error(`插件 ${plugin.id} 已注册`)
    this.plugins.set(plugin.id, plugin)
    this.builtinPluginIds.add(plugin.id)
    return this
  }

  syncExternal(plugins: BusinessPlugin[] = []) {
    for (const id of this.externalPluginIds) this.plugins.delete(id)
    this.externalPluginIds.clear()
    for (const plugin of plugins) {
      if (this.builtinPluginIds.has(plugin.id)) {
        throw new Error(`租户插件 ${plugin.id} 与内置插件重名，请使用业务前缀`)
      }
      this.plugins.set(plugin.id, plugin)
      this.externalPluginIds.add(plugin.id)
    }
  }

  all() {
    return [...this.plugins.values()]
  }

  get(id: string) {
    return this.plugins.get(id)
  }

  unregister(id: string) {
    if (this.builtinPluginIds.has(id)) throw new Error(`内置插件 ${id} 不能删除`)
    this.plugins.delete(id)
    this.externalPluginIds.delete(id)
  }

  sampleData() {
    return Object.assign({}, ...this.all().map((plugin) => plugin.sampleData))
  }

  createHiprintProvider(hiprint: any) {
    const plugins = this.all()
    return function BusinessProvider() {
      return {
        addElementTypes(context: any) {
          context.removePrintElementTypes('business')
          context.addPrintElementTypes(
            'business',
            plugins.map(
              (plugin) => new hiprint.PrintElementTypeGroup(
                `${plugin.icon} ${plugin.name}`,
                plugin.fields.map((field) => fieldToElement(plugin, field)),
              ),
            ),
          )
        },
      }
    }
  }
}

function fieldToElement(plugin: BusinessPlugin, field: BusinessField) {
  const kind = field.kind ?? 'text'
  const type = kind === 'barcode' || kind === 'qrcode' ? 'text' : kind
  const element: Record<string, unknown> = {
    tid: `business.${plugin.id}.${field.key}`,
    title: field.label,
    data: field.sample ?? field.label,
    type,
    options: {
      field: field.key,
      testData: field.sample ?? field.label,
      height: kind === 'image' ? 48 : kind === 'longText' ? 52 : 18,
      fontSize: 9,
      textContentVerticalAlign: 'middle',
      ...(kind === 'barcode' || kind === 'qrcode' ? { textType: kind } : {}),
      ...field.options,
    },
  }
  if (kind === 'table') {
    element.editable = true
    element.columnDisplayEditable = true
    element.columnDisplayIndexEditable = true
    element.columnTitleEditable = true
    element.columnResizable = true
    element.columnAlignEditable = true
    element.isEnableEditField = true
    element.isEnableContextMenu = true
    element.columns = [field.columns ?? []]
    element.options = {
      ...(element.options as Record<string, unknown>),
      fields: field.columns?.map(({ title, field }) => ({ text: title, field })),
    }
  }
  return element
}

export const pluginRegistry = new PluginRegistry()

export function createPluginRegistry(initial: BusinessPlugin[] = []) {
  const registry = new PluginRegistry()
  initial.forEach((plugin) => registry.registerBuiltIn(plugin))
  return registry
}

export function registerPlugin(plugin: BusinessPlugin) {
  pluginRegistry.register(plugin)
  return plugin
}
