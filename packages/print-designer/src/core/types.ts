export type ElementKind = 'text' | 'longText' | 'image' | 'table' | 'barcode' | 'qrcode' | 'hline' | 'vline' | 'rect'

export interface BusinessField {
  key: string
  label: string
  kind?: ElementKind
  sample?: unknown
  options?: Record<string, unknown>
  columns?: Array<{ title: string; field: string; width?: number; align?: string }>
}

export interface BusinessPlugin {
  id: string
  name: string
  icon: string
  color: string
  fields: BusinessField[]
  sampleData: Record<string, unknown>
}

export interface DesignerSnapshot {
  template: Record<string, unknown>
  savedAt: string
}

/** 单据使用对象，批量标签使用对象数组。 */
export type PrintData = Record<string, unknown> | Array<Record<string, unknown>>

export interface FullHtmlOptions {
  title?: string
  lang?: string
}

export interface DesignerTestCase {
  id: string
  name: string
  description: string
  template: Record<string, unknown>
  data: PrintData
  assertions: string[]
}

export interface DesignerModules {
  toolbar?: boolean
  palette?: boolean
  canvasToolbar?: boolean
  properties?: boolean
  footer?: boolean
  labels?: Partial<Record<'palette' | 'properties' | 'canvasToolbar', string>>
}

export interface PrintAdapter {
  mount(target: string, settingTarget: string, paginationTarget: string): void
  destroy(): void
  getTemplate(): Record<string, unknown>
  updateTemplate(template: Record<string, unknown>): void
  setPaper(width: number, height: number): void
  rotate(): void
  zoom(value: number): void
  undo(): void
  redo(): void
  clear(): void
  getHtml(data: PrintData): string
  getFullHtml(data: PrintData, options?: FullHtmlOptions): string
  preview(target: HTMLElement, data: PrintData): void
  print(data: PrintData): void
  silentPrint(data: PrintData): Promise<void>
}

export type DesignerChangeType = 'add' | 'move' | 'delete' | 'update' | 'resize' | 'rotate' | string
