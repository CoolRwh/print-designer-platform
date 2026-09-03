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

## Vue3 与 Vue2.6

Vue3 项目安装 `@print-designer/designer`，Vue2.6 项目安装 `@print-designer/designer-vue2`，两者共享 `plugins`、`template`、`data` 参数和模板事件。

```vue
<Designer v-if="loaded" :plugins="plugins" :template="template" :data="printData"
  @template-change="saveTemplate" @template-ready="onReady" @template-error="onError" />
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

事件：`template-ready`、`template-change`、`template-error`、`preview`、`print`、`save`。

可通过 `modules` 控制 toolbar、palette、canvasToolbar、properties、footer，并通过同名插槽替换模块。替换时需保留 `.hiprintEpContainer`、`#hiprint-canvas`、`#hiprint-settings`、`#hiprint-pagination`。
