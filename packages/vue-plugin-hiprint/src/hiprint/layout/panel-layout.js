const PRINT_HEIGHT_SAFETY_MM = 0.1

function positiveInteger(value, fallback = 1) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function finiteNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function calculateRowLayout(panel) {
  const options = panel?.panelLayoutOptions || {}
  const columns = positiveInteger(options.layoutColumns)
  if (options.layoutType !== 'row' || columns < 2) return null

  const panelWidth = finiteNumber(panel.width)
  const panelHeight = finiteNumber(panel.height)
  const columnGap = Math.max(0, finiteNumber(options.layoutColumnGap))
  const rowGap = Math.max(0, finiteNumber(options.layoutRowGap))

  return {
    columns,
    columnGap,
    rowGap,
    pageWidth: panelWidth * columns + columnGap * (columns - 1),
    pageHeight: panelHeight,
    flowHeight: Math.max(0, panelHeight - PRINT_HEIGHT_SAFETY_MM),
    panelLeft(index) {
      return index % columns * (panelWidth + columnGap)
    },
    pageIndex(index) {
      return Math.floor(index / columns)
    },
  }
}

export function createRowLayoutStyle(panel) {
  const layout = calculateRowLayout(panel)
  if (!layout) return ''

  return `
    <style data-hiprint-layout="row">
      .hiprint-printTemplate { margin: 0; padding: 0; }
      .hiprint-printTemplate .hiprint-layout-page {
        position: relative;
        overflow: hidden;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .hiprint-printTemplate .hiprint-printPanel {
        position: absolute;
        top: 0;
        margin: 0;
        padding: 0;
        page-break-after: auto !important;
        break-after: auto !important;
      }
      .hiprint-printTemplate .hiprint-layout-page .hiprint-printPaper {
        page-break-after: auto !important;
        break-after: auto !important;
      }
      @media screen {
        .hiprint-printTemplate .hiprint-layout-page:not(:last-of-type) {
          margin-bottom: ${layout.rowGap}mm;
        }
      }
    </style>
  `
}

export function getRowLayoutPrintSize(panel) {
  const layout = calculateRowLayout(panel)
  return layout ? `size: ${layout.pageWidth}mm ${layout.pageHeight}mm;` : ''
}

export function applyRowPanelLayout($, rootElement, printPanels) {
  if (printPanels.length !== 1) return rootElement
  const layout = calculateRowLayout(printPanels[0])
  if (!layout) return rootElement

  const panels = rootElement.children('.hiprint-printPanel').detach()
  const sharedStyles = panels.first().children('style').detach()
  panels.children('style').remove()

  panels.each(function (index, element) {
    const pageIndex = layout.pageIndex(index)
    let page = rootElement.children('.hiprint-layout-page').eq(pageIndex)
    if (!page.length) {
      page = $('<div class="hiprint-layout-page"></div>').css({
        width: `${layout.pageWidth}mm`,
        height: `${layout.flowHeight}mm`,
      })
      rootElement.append(page)
    }
    $(element).css({ left: `${layout.panelLeft(index)}mm` })
    page.append(element)
  })

  rootElement.prepend(sharedStyles)
  return rootElement
}
