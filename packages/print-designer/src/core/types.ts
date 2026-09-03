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
  preview(target: HTMLElement, data: Record<string, unknown>): void
  print(data: Record<string, unknown>): void
  silentPrint(data: Record<string, unknown>): Promise<void>
}

export type DesignerChangeType = 'add' | 'move' | 'delete' | 'update' | 'resize' | 'rotate' | string
