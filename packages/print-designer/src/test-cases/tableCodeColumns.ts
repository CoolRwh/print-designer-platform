import type { DesignerTestCase } from '../core/types'

/** 用例 2：在同一个表格中分别渲染文本、条形码和二维码列。 */
export const tableCodeColumnsCase: DesignerTestCase = {
  id: 'table-code-columns',
  name: '表格条形码与二维码列',
  description: '验证 tableTextType 能在列级别把字段值渲染为条形码或二维码。',
  template: {
    panels: [{
      index: 0,
      name: '商品码表',
      paperType: 'A4',
      width: 210,
      height: 296.6,
      paperHeader: 66,
      paperFooter: 760,
      printElements: [
        {
          options: {
            left: 42,
            top: 30,
            width: 510,
            height: 28,
            title: '商品条码与二维码测试',
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            hideTitle: true,
          },
          printElementType: { title: '标题', type: 'text' },
        },
        {
          options: {
            left: 42,
            top: 78,
            width: 510,
            height: 190,
            field: 'items',
            fields: [
              { text: '商品', field: 'name' },
              { text: '条形码', field: 'barcode' },
              { text: '二维码', field: 'qrcode' },
            ],
            columns: [[
              { title: '商品', field: 'name', width: 150, align: 'left' },
              {
                title: '条形码',
                field: 'barcode',
                width: 220,
                align: 'center',
                tableTextType: 'barcode',
                tableBarcodeMode: 'CODE128B',
                tableColumnHeight: 42,
                showCodeTitle: true,
              },
              {
                title: '二维码',
                field: 'qrcode',
                width: 110,
                align: 'center',
                tableTextType: 'qrcode',
                tableQRCodeLevel: 0,
                tableColumnHeight: 58,
                showCodeTitle: false,
              },
            ]],
          },
          printElementType: {
            title: '商品编码表',
            type: 'table',
            editable: true,
            columnDisplayEditable: true,
            columnResizable: true,
          },
        },
      ],
    }],
  },
  data: {
    items: [
      { name: '轻量连帽夹克', barcode: '6901234567892', qrcode: 'https://example.test/products/JK-2026-BLK-M' },
      { name: '城市通勤双肩包', barcode: '6901234567809', qrcode: 'https://example.test/products/BG-2026-GRY' },
    ],
  },
  assertions: [
    '商品列应显示普通文本。',
    '条形码列应显示 CODE128B 图形并在下方显示原值。',
    '二维码列应显示二维码，且不显示原值标题。',
  ],
}
