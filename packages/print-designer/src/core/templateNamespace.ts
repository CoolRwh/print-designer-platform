/** Remap only element identifiers; leave field names, data and formatter text intact. */
export function mapTemplateNamespace(template: Record<string, unknown>, from: string, to: string): Record<string, unknown> {
  function visit(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(visit)
    if (!value || typeof value !== 'object') return value
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key,
      key === 'tid' && typeof child === 'string' && child.startsWith(`${from}.`)
        ? `${to}${child.slice(from.length)}` : visit(child),
    ]))
  }
  return visit(template) as Record<string, unknown>
}
