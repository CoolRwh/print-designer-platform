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

### 单独加载打印样式

仅展示打印 HTML 的页面可以独立加载打印样式，无需引入设计器组件或完整界面样式。将构建后的 `dist-lib/print-lock.css` 复制到业务项目静态目录，并在页面入口加入：

```html
<link rel="stylesheet" href="/print-lock.css">
```

不指定 `media`，样式才能同时用于屏幕展示和打印；也可以使用 `import '@print-designer/designer/print-lock.css'`。该文件由 `pnpm build:designer` 生成。直接调用底层客户端接口且未传 `styleHandler` 时，还需额外加入 `<link rel="stylesheet" href="/print-lock.css" media="print">`，供旧接口查找。

`getHtml()` 返回的片段需要在展示页面加载此样式；独立 iframe 或新窗口需要在各自文档中加载。`getFullHtml()` 和设计器组件发起的打印已内嵌打印样式，无需重复引入。设计器页面仍使用 `@print-designer/designer/style.css`。

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

可通过 `modules` 控制 toolbar、palette、canvasToolbar、properties、footer，并通过插槽替换模块（画布工具栏插槽名为 `canvas-toolbar`）。无需保留内部节点；需要显示引擎面板时，在对应插槽中提供 `.hiprintEpContainer`、`.hiprint-settings` 或 `.hiprint-pagination` 容器，未提供时使用隐藏容器。
