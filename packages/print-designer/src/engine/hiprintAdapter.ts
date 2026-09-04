import $ from 'jquery'
import { hiprint } from '@hiprint-engine'
import type { PrintAdapter, PrintData } from '../core/types'
import { pluginRegistry as defaultPluginRegistry, type PluginRegistry } from '../core/pluginRegistry'
import { starterTemplate } from '../templates/starterTemplate'
import type { DesignerChangeType } from '../core/types'

export class HiprintAdapter implements PrintAdapter {
  private instance: any
  private onChange?: (type: DesignerChangeType, template: Record<string, unknown>) => void
  private onUpdateError?: (error: unknown) => void
  private initialTemplate: Record<string, unknown>
  private registry: PluginRegistry

  constructor(onChange?: (type: DesignerChangeType, template: Record<string, unknown>) => void, options?: { template?: Record<string, unknown>; onUpdateError?: (error: unknown) => void; registry?: PluginRegistry }) {
    this.onChange = onChange
    this.onUpdateError = options?.onUpdateError
    this.initialTemplate = options?.template ?? starterTemplate
    this.registry = options?.registry ?? defaultPluginRegistry
  }

  mount(target: string, settingTarget: string, paginationTarget: string) {
    // The designer does not initiate the optional local print-client socket.
    ;(window as Window & { autoConnect?: boolean }).autoConnect = false
    const Provider = this.registry.createHiprintProvider(hiprint)
    hiprint.init({ providers: [Provider()], lang: 'cn' })
    hiprint.setConfig()
    $(target).empty()
    $(settingTarget).empty()
    $('.hiprintEpContainer').empty()
    hiprint.PrintElementTypeManager.build('.hiprintEpContainer', 'business')
    this.instance = new hiprint.PrintTemplate({
      template: this.initialTemplate,
      history: true,
      dataMode: 1,
      qtDesigner: true,
      willOutOfBounds: true,
      settingContainer: settingTarget,
      paginationContainer: paginationTarget,
      onDataChanged: (type: DesignerChangeType, json: Record<string, unknown>) => this.onChange?.(type, json),
      onUpdateError: (error: unknown) => { console.error('[hiprint update]', error); this.onUpdateError?.(error) },
    })
    this.instance.design(target, { grid: true })
  }

  refreshPlugins() {
    const Provider = this.registry.createHiprintProvider(hiprint)
    hiprint.init({ providers: [Provider()], lang: 'cn' })
    $('.hiprintEpContainer').empty()
    hiprint.PrintElementTypeManager.build('.hiprintEpContainer', 'business')
  }

  destroy() { $(this.instance?.printElementOptionSetting?.container).empty(); this.instance = undefined }
  getTemplate() { return this.instance?.getJson() ?? starterTemplate }
  updateTemplate(template: Record<string, unknown>) { this.instance?.update(template) }
  setPaper(width: number, height: number) { this.instance?.setPaper(width, height) }
  rotate() { this.instance?.rotatePaper() }
  zoom(value: number) { this.instance?.zoom(value) }
  undo() { this.instance?.undo?.() }
  redo() { this.instance?.redo?.() }
  clear() { this.instance?.clear() }
  preview(target: HTMLElement, data: PrintData) { $(target).empty().append(this.instance.getHtml(data)) }
  print(data: PrintData) { this.instance?.print(data) }
  async silentPrint(data: PrintData) {
    if (window.electronPrint) return window.electronPrint({ template: this.getTemplate(), data })
    if (this.instance?.print2) { this.instance.print2(data, { title: 'Print Studio' }); return }
    throw new Error('未检测到 Electron bridge 或 Hiprint 打印客户端')
  }
}
