import { pluginRegistry } from '../core/pluginRegistry'
import type { BusinessPlugin } from '../core/types'

const plugins: BusinessPlugin[] = [
  {
    id: 'product', name: '商品', icon: '◈', color: '#ff9f43',
    fields: [
      { key: 'product.name', label: '商品名称', sample: '轻量连帽夹克' },
      { key: 'product.sku', label: '商品 SKU', sample: 'JK-2026-BLK-M' },
      { key: 'product.barcode', label: '商品条码', kind: 'barcode', sample: '6901234567892', options: { width: 140, height: 38 } },
      { key: 'product.image', label: '商品图片', kind: 'image', sample: '' },
      { key: 'product.price', label: '销售价', sample: '¥ 399.00' },
      { key: 'product.spec', label: '规格', sample: '黑色 / M' },
    ],
    sampleData: { product: { name: '轻量连帽夹克', sku: 'JK-2026-BLK-M', barcode: '6901234567892', price: '¥ 399.00', spec: '黑色 / M' } },
  },
  {
    id: 'order', name: '订单', icon: '▤', color: '#5b8cff',
    fields: [
      { key: 'order.no', label: '订单编号', sample: 'SO202609030018' },
      { key: 'order.date', label: '下单时间', sample: '2026-09-03 10:28' },
      { key: 'order.qrcode', label: '订单二维码', kind: 'qrcode', sample: 'SO202609030018', options: { width: 58, height: 58 } },
      { key: 'order.amount', label: '订单金额', sample: '¥ 798.00' },
      { key: 'order.remark', label: '订单备注', kind: 'longText', sample: '请放在前台，易碎品轻拿轻放。' },
      { key: 'order.items', label: '商品明细表', kind: 'table', sample: [], columns: [
        { title: '商品', field: 'name', width: 150 }, { title: '规格', field: 'spec', width: 90 },
        { title: '数量', field: 'qty', width: 55, align: 'center' }, { title: '金额', field: 'amount', width: 80, align: 'right' },
      ] },
    ],
    sampleData: { order: { no: 'SO202609030018', date: '2026-09-03 10:28', qrcode: 'SO202609030018', amount: '¥ 798.00', remark: '请放在前台，易碎品轻拿轻放。', items: [{ name: '轻量连帽夹克', spec: '黑色 / M', qty: 2, amount: '798.00' }] } },
  },
  {
    id: 'member', name: '会员', icon: '◎', color: '#a77bff',
    fields: [
      { key: 'member.name', label: '会员姓名', sample: '林晓舟' },
      { key: 'member.mobile', label: '会员手机', sample: '138****8602' },
      { key: 'member.level', label: '会员等级', sample: '黑金会员' },
      { key: 'member.points', label: '可用积分', sample: '12,680' },
    ],
    sampleData: { member: { name: '林晓舟', mobile: '138****8602', level: '黑金会员', points: '12,680' } },
  },
  {
    id: 'store', name: '门店', icon: '⌂', color: '#2fc9a5',
    fields: [
      { key: 'store.name', label: '门店名称', sample: '杭州湖滨旗舰店' },
      { key: 'store.address', label: '门店地址', kind: 'longText', sample: '杭州市上城区湖滨路 88 号' },
      { key: 'store.phone', label: '联系电话', sample: '0571-8888 6888' },
      { key: 'store.cashier', label: '收银员', sample: 'S-018 / 小安' },
    ],
    sampleData: { store: { name: '杭州湖滨旗舰店', address: '杭州市上城区湖滨路 88 号', phone: '0571-8888 6888', cashier: 'S-018 / 小安' } },
  },
  {
    id: 'custom', name: '自定义字段', icon: '✣', color: '#ef6b8d',
    fields: [
      { key: 'custom.text', label: '自定义文本', sample: '双击或在右侧修改内容' },
      { key: 'custom.longText', label: '自定义长文本', kind: 'longText', sample: '可绑定任意业务字段' },
      { key: 'custom.image', label: '自定义图片', kind: 'image' },
      { key: 'custom.line', label: '分割线', kind: 'hline', options: { width: 180, height: 8 } },
      { key: 'custom.box', label: '矩形', kind: 'rect', options: { width: 100, height: 60 } },
    ],
    sampleData: { custom: { text: '感谢惠顾，欢迎再次光临！', longText: '本单据由 Print Studio 自动生成。' } },
  },
]

plugins.forEach((plugin) => pluginRegistry.registerBuiltIn(plugin))

export { plugins }
