import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateRowLayout, createRowLayoutStyle, getRowLayoutPrintSize } from '../src/hiprint/layout/panel-layout.js'

const doubleLabelPanel = {
  width: 40,
  height: 30,
  panelLayoutOptions: {
    layoutType: 'row',
    layoutColumns: 2,
    layoutColumnGap: 2,
    layoutRowGap: 2,
  },
}

test('calculates an 82 × 30 mm sheet for two 40 mm labels', () => {
  const layout = calculateRowLayout(doubleLabelPanel)
  assert.equal(layout.pageWidth, 82)
  assert.equal(layout.pageHeight, 30)
  assert.equal(layout.flowHeight, 29.9)
})

test('groups labels by page and assigns deterministic horizontal positions', () => {
  const layout = calculateRowLayout(doubleLabelPanel)
  assert.deepEqual([0, 1, 2, 3].map((index) => layout.pageIndex(index)), [0, 0, 1, 1])
  assert.deepEqual([0, 1, 2, 3].map((index) => layout.panelLeft(index)), [0, 42, 0, 42])
})

test('emits print size and layout CSS without forced page breaks', () => {
  assert.equal(getRowLayoutPrintSize(doubleLabelPanel), 'size: 82mm 30mm;')
  const css = createRowLayoutStyle(doubleLabelPanel)
  assert.match(css, /margin-bottom: 2mm/)
  assert.doesNotMatch(css, /break-after:\s*page/)
})

test('does not activate row sheets without at least two columns', () => {
  assert.equal(calculateRowLayout({ ...doubleLabelPanel, panelLayoutOptions: { layoutType: 'row', layoutColumns: 1 } }), null)
  assert.equal(calculateRowLayout({ ...doubleLabelPanel, panelLayoutOptions: { layoutType: 'column', layoutColumns: 2 } }), null)
})
