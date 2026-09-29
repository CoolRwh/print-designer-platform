import $ from 'jquery'
import { hiprint } from '@hiprint-engine'
import printLockCss from '../../../vue-plugin-hiprint/src/hiprint/css/print-lock.css?raw'
import { buildFullHtmlDocument } from '../../../vue-plugin-hiprint/src/hiprint/html-document.js'
import type { FullHtmlOptions, PrintAdapter, PrintData } from '../core/types'
import { pluginRegistry as defaultPluginRegistry, type PluginRegistry } from '../core/pluginRegistry'
import { starterTemplate } from '../templates/starterTemplate'
import type { DesignerChangeType } from '../core/types'
import { mapTemplateNamespace } from '../core/templateNamespace'

let nextInstanceId = 0

function selectTarget(target: string | HTMLElement) {
  return typeof target === 'string' ? $(target) : $(target)
}

export class HiprintAdapter implements PrintAdapter {
  private instance: any
  private namespace = `designer_${Date.now().toString(36)}_${++nextInstanceId}_types`
  private onChange?: (type: DesignerChangeType, template: Record<string, unknown>) => void
  private onUpdateError?: (error: unknown) => void
  private initialTemplate: Record<string, unknown>
  private registry: PluginRegistry
  private paletteTarget: string | HTMLElement = '.hiprintEpContainer'

  constructor(onChange?: (type: DesignerChangeType, template: Record<string, unknown>) => void, options?: { template?: Record<string, unknown>; onUpdateError?: (error: unknown) => void; registry?: PluginRegistry }) {
    this.onChange = onChange
    this.onUpdateError = options?.onUpdateError
    this.initialTemplate = options?.template ?? starterTemplate
    this.registry = options?.registry ?? defaultPluginRegistry
  }

  mount(target: string | HTMLElement, settingTarget: string | HTMLElement, paginationTarget: string | HTMLElement, paletteTarget: string | HTMLElement = '.hiprintEpContainer') {
    // The designer does not initiate the optional local print-client socket.
    ;(window as Window & { autoConnect?: boolean }).autoConnect = false
    this.destroy()
    const Provider = this.registry.createHiprintProvider(hiprint, this.namespace)
    hiprint.init({ providers: [Provider()], lang: 'cn' })
    hiprint.setConfig()
    selectTarget(target).empty()
    selectTarget(settingTarget).empty()
    this.paletteTarget = paletteTarget
    selectTarget(this.paletteTarget).empty()
    hiprint.PrintElementTypeManager.build(this.paletteTarget, this.namespace)
    this.instance = new hiprint.PrintTemplate({
      template: mapTemplateNamespace(this.initialTemplate, 'business', this.namespace),
      history: true,
      dataMode: 1,
      qtDesigner: true,
      willOutOfBounds: true,
      settingContainer: settingTarget,
      paginationContainer: paginationTarget,
      onDataChanged: (type: DesignerChangeType, json: Record<string, unknown>) => this.onChange?.(type, mapTemplateNamespace(json, this.namespace, 'business')),
      onUpdateError: (error: unknown) => { console.error('[hiprint update]', error); this.onUpdateError?.(error) },
    })
    this.instance.design(target, { grid: true })
  }

  refreshPlugins() {
    if (!this.instance) return
    const Provider = this.registry.createHiprintProvider(hiprint, this.namespace)
    hiprint.init({ providers: [Provider()], lang: 'cn' })
    selectTarget(this.paletteTarget).empty()
    hiprint.PrintElementTypeManager.build(this.paletteTarget, this.namespace)
  }

  destroy() {
    if (!this.instance) return
    this.instance.destroy()
    hiprint.PrintElementTypeManager.remove(this.namespace)
    selectTarget(this.paletteTarget).empty()
    this.instance = undefined
  }
  getTemplate() { return this.instance ? mapTemplateNamespace(this.instance.getJson(), this.namespace, 'business') : this.initialTemplate }
  updateTemplate(template: Record<string, unknown>) {
    this.initialTemplate = template
    this.instance?.update(mapTemplateNamespace(template, 'business', this.namespace))
  }
  setPaper(width: number, height: number) { this.instance?.setPaper(width, height) }
  rotate() { this.instance?.rotatePaper() }
  zoom(value: number) { this.instance?.zoom(value) }
  undo() { this.instance?.undo?.() }
  redo() { this.instance?.redo?.() }
  clear() { this.instance?.clear() }
  getHtml(data: PrintData) {
    if (!this.instance) throw new Error('打印设计器尚未初始化')
    const html = this.instance.getHtml(data)
    return html?.[0]?.outerHTML ?? ''
  }
  getFullHtml(data: PrintData, options: FullHtmlOptions = {}) {
    return buildFullHtmlDocument(this.getHtml(data), printLockCss, options)
  }
  preview(target: HTMLElement, data: PrintData) { $(target).empty().append(this.getHtml(data)) }
  print(data: PrintData) {
    this.instance?.print(data, undefined, { styleHandler: () => `<style>${printLockCss}</style>` })
  }
  async silentPrint(data: PrintData) {
    if (!this.instance) throw new Error('打印设计器尚未初始化')
    if (window.electronPrint) return window.electronPrint({ template: this.getTemplate(), data })
    if (this.instance?.print2) {
      if (!this.instance.clientIsOpened()) throw new Error('打印客户端未连接，请先连接客户端')
      await this.instance.print2(data, { title: 'Print Studio', styleHandler: () => `<style>${printLockCss}</style>` })
      return
    }
    throw new Error('未检测到 Electron bridge 或 Hiprint 打印客户端')
  }
}
