import type { DesignerTestCase } from '../core/types'

/**
 * 用例 1：50 × 30 mm 商品标签按横向续排。
 * data 必须传数组；panelLayoutOptions 控制多个标签横向排列。
 */
export const twoColumnLabelsCase: DesignerTestCase = {
  id: 'two-column-labels',
  name: '一排两个商品标签',
  description: '验证批量数据按横向续排，每行显示两个 50 × 30 mm 标签。',
  template: {
    panels: [
      {
        index: 0,
        name: '双列商品标签',
        width: 50,
        height: 30,
        paperHeader: 0,
        paperFooter: 85,
        panelLayoutOptions: {
          layoutType: 'row',
          layoutRowGap: 2,
          layoutColumnGap: 2,
        },
        printElements: [
          {
            options: {
              left: 8,
              top: 7,
              width: 126,
              height: 20,
              field: 'name',
              testData: '轻量连帽夹克',
              fontSize: 12,
              fontWeight: '700',
              hideTitle: true,
            },
            printElementType: { title: '商品名称', type: 'text' },
          },
          {
            options: {
              left: 8,
              top: 29,
              width: 126,
              height: 13,
              field: 'sku',
              testData: 'JK-2026-BLK-M',
              fontSize: 8,
              hideTitle: true,
            },
            printElementType: { title: '商品 SKU', type: 'text' },
          },
          {
            options: {
              left: 8,
              top: 45,
              width: 126,
              height: 31,
              field: 'barcode',
              testData: '6901234567892',
              textType: 'barcode',
              barcodeMode: 'CODE128B',
              showCodeTitle: true,
              hideTitle: true,
            },
            printElementType: { title: '商品条形码', type: 'text' },
          },
        ],
      }],
  },
  data: [
    { name: '轻量连帽夹克', sku: 'JK-2026-BLK-M', barcode: '6901234567892' },
    { name: '城市通勤双肩包', sku: 'BG-2026-GRY', barcode: '6901234567809' },
    { name: '纯棉基础 T 恤', sku: 'TS-2026-WHT-L', barcode: '6901234567816' },
    { name: '复古运动鞋', sku: 'SN-2026-CRM-42', barcode: '6901234567823' },
  ],
  assertions: [
    '预览应生成 4 个标签面板。',
    '标签采用横向续排，容器宽度足够时每行显示 2 个。',
    '每个标签的商品名称、SKU 和条形码应来自同一个数组元素。',
  ],
}
