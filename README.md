# Print Designer Platform

面向 SaaS 的打印设计平台，提供 Vue3 和 Vue2.6 两个设计器入口。

## 包结构

```text
packages/
├── vue-plugin-hiprint       # 底层打印引擎
├── print-designer           # Vue3 + TypeScript 设计器
└── print-designer-vue2      # Vue2.6 设计器
```

## 安装与运行

```bash
pnpm install
pnpm dev
pnpm build
pnpm build:designer
pnpm build:vue2
```

### 浏览器测试用例

开发服务启动后，可通过查询参数直接载入内置测试用例：

- `http://localhost:5178/?case=two-column-labels`：批量数据横向续排，一排两个商品标签。
- `http://localhost:5178/?case=table-code-columns`：表格普通文本、条形码、二维码混合列。
- `http://localhost:5178/?case=delivery-order`：210 × 134 mm 配货单测试单据。

测试用例也可以从组件包中直接导入：

```ts
import {
  twoColumnLabelsCase,
  tableCodeColumnsCase,
  deliveryOrderCase,
} from '@print-designer/designer'
```

## Vue3 与 Vue2.6

Vue3 项目安装 `@print-designer/designer`，Vue2.6 项目安装 `@print-designer/designer-vue2`，两者共享 `plugins`、`template`、`data` 参数和模板事件。

```vue
<Designer v-if="loaded" :plugins="plugins" :template="template" :data="printData"
  @template-change="saveTemplate" @template-ready="onReady" @template-error="onError" />
```

传入 `testCases` 后，设计器顶部会显示“模板中心”选择器；正式页面不传时不会显示：

```vue
<Designer
  :test-cases="designerTestCases"
  initial-test-case-id="two-column-labels"
  @test-case-change="onTestCaseChange"
/>
```

## SaaS 动态配置

```ts
async function loadTenant(tenantId: string) {
  const config = await api.get(`/tenants/${tenantId}/print-config`)
  plugins.value = config.plugins
  template.value = config.template
  printData.value = config.printData
  loaded.value = true
}
```

后端只返回插件元数据，不要返回可执行 JavaScript。插件 ID 建议使用业务前缀，例如 `tenant_product`。

## 事件与模块

事件：`template-ready`、`template-change`、`template-error`、`preview`、`print`、`save`、`plugin-add`、`plugin-remove`。

左侧组件区的“＋”会打开插件管理器，可以录入插件 ID、名称、颜色以及字段 JSON。生产环境可监听 `plugin-add`，将配置保存到当前租户的后端接口。

可通过 `modules` 控制 toolbar、palette、canvasToolbar、properties、footer，并通过同名插槽替换模块。替换时需保留 `.hiprintEpContainer`、`#hiprint-canvas`、`#hiprint-settings`、`#hiprint-pagination`。
