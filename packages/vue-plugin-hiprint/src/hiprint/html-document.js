function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] || character)
}

export function buildFullHtmlDocument(content, css, options = {}) {
  const title = escapeText(options.title || 'Print Studio')
  const lang = escapeText(options.lang || 'zh-CN')
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${css}</style></head><body>${content}</body></html>`
}
