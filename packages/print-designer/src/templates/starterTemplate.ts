export const starterTemplate = {
  panels: [{
    index: 0,
    name: '收货单',
    paperType: 'A4',
    height: 296.6,
    width: 210,
    paperHeader: 49.5,
    paperFooter: 780,
    printElements: [
      { options: { left: 60, top: 30, height: 32, width: 475, title: '订单发货单', fontSize: 22, lineHeight: 30, fontWeight: '700', textAlign: 'center', textContentVerticalAlign: 'middle', hideTitle: true }, printElementType: { title: '标题', type: 'text' } },
      { options: { left: 60, top: 78, height: 18, width: 250, field: 'store.name', testData: '杭州湖滨旗舰店' }, printElementType: { title: '门店名称', type: 'text' } },
      { options: { left: 355, top: 78, height: 18, width: 180, field: 'order.no', testData: 'SO202609030018', textAlign: 'right' }, printElementType: { title: '订单编号', type: 'text' } },
      { options: { left: 60, top: 112, height: 18, width: 240, field: 'member.name', testData: '林晓舟' }, printElementType: { title: '会员姓名', type: 'text' } },
      { options: { left: 60, top: 152, height: 80, width: 475, field: 'order.items', fields: [{ text: '商品', field: 'name' }, { text: '规格', field: 'spec' }, { text: '数量', field: 'qty' }, { text: '金额', field: 'amount' }], columns: [[{ title: '商品', field: 'name', width: 180 }, { title: '规格', field: 'spec', width: 100 }, { title: '数量', field: 'qty', width: 70, align: 'center' }, { title: '金额', field: 'amount', width: 100, align: 'right' }]] }, printElementType: { title: '商品明细表', type: 'table', editable: true, columnDisplayEditable: true, columnResizable: true } },
      { options: { left: 385, top: 252, height: 20, width: 150, field: 'order.amount', testData: '¥ 798.00', fontWeight: '700', textAlign: 'right' }, printElementType: { title: '订单金额', type: 'text' } },
    ],
  }],
}
