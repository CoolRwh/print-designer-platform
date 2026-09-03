/// <reference types="vite/client" />

declare module '@hiprint-engine' {
  export const hiprint: any
  export const defaultElementTypeProvider: any
  export function autoConnect(callback?: (status: boolean, message: unknown) => void): void
  export function disAutoConnect(): void
}

interface Window {
  electronPrint?: (payload: { template: unknown; data: unknown }) => Promise<void>
}
