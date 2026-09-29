# Print Studio

基于 Vue 3、TypeScript、Vite 与 `vue-plugin-hiprint` 的业务打印设计器。

## 启动

```bash
cd print-designer
npm install
npm run dev
```

## 分层

- `src/plugins/`：商品、订单、会员、门店与自定义字段插件。
- `src/core/pluginRegistry.ts`：插件注册、字段到 Hiprint 元素的转换。
- `src/engine/hiprintAdapter.ts`：屏蔽 Hiprint、浏览器打印与 Electron bridge 差异。
- `src/App.vue`：设计器 UI 与模板工作流。

Electron 侧只需通过 preload 暴露 `window.electronPrint({ template, data })`，设计器会自动优先使用它；浏览器环境使用 Hiprint 客户端或系统打印。

## 作为 Vue 组件使用

构建组件包：

```bash
npm run build:lib
```

其它 Vue 3 项目可直接引入：

```ts
import { Designer } from '@print-designer/designer'
import '@print-designer/designer/style.css'

app.component('Designer', Designer)
```

```vue
<Designer
  title="销售订单"
  :template="templateJson"
  :data="printData"
  :plugins="customPlugins"
  @template-change="onTemplateChange"
  @template-ready="onReady"
  @template-error="onTemplateError"
  style="height: 100vh"
/>
```

设计器事件：

- `template-ready(template, adapter)`：Hiprint 初始化完成。
- `template-change(type, template)`：模板新增、移动、删除、属性修改、尺寸调整或旋转时触发，`type` 常见值为 `add`、`move`、`delete`、`update`、`resize`、`rotate`。
- `template-error(error)`：属性更新失败。
- `preview(data)`、`print(data)`、`save(template)`：预览、打印、保存操作触发。
- `html(html)`：点击顶部“获取 HTML”后触发，参数为可独立打开的完整 HTML；同时会复制到剪贴板。

```ts
function onTemplateChange(type, template) {
  console.log('模板变化:', type, template)
  // 可在这里自动保存到后端
}

function onReady(template, adapter) {
  console.log('设计器已就绪', template, adapter)
}

function onTemplateError(error) {
  console.error('模板更新失败', error)
}
```

## 获取渲染 HTML

`template-ready` 返回的适配器支持两种结果：`getHtml()` 返回可嵌入当前页面的渲染片段，`getFullHtml()` 返回包含 `DOCTYPE`、基础打印 CSS 和渲染内容的独立文档：

```ts
function onReady(template, adapter) {
  const fragment = adapter.getHtml(printData)
  const documentHtml = adapter.getFullHtml(printData, { title: '商品标签' })
  console.log(fragment, documentHtml)
}
```

也可以通过组件引用获取；省略参数时使用组件的 `data`：

```vue
<script setup lang="ts">
import { ref } from 'vue'

const designer = ref()

function getRenderedHtml() {
  return designer.value?.getFullHtml()
}
</script>

<template>
  <Designer ref="designer" :template="templateJson" :data="printData" />
</template>
```

Vue 2 组件同样支持 `this.$refs.designer.getHtml(data)` 和 `this.$refs.designer.getFullHtml(data)`。

也可以在组件挂载前注册自定义业务插件：

```ts
import { registerPlugin } from '@print-designer/designer'

registerPlugin({
  id: 'warehouse', name: '仓储', icon: '▦', color: '#38bdf8',
  fields: [{ key: 'warehouse.bin', label: '库位', sample: 'A-01-08' }],
  sampleData: { warehouse: { bin: 'A-01-08' } },
})
```

SaaS 场景推荐直接把后端返回的租户配置传给 `Designer`，不把字段写死在组件内部：

```vue
  <Designer
    v-if="configLoaded"
  :plugins="tenantPlugins"
  :template="tenantTemplate"
  :data="printData"
  @template-change="saveTemplate"
    @template-ready="designerReady = true"
/> 
```

```ts
  const configLoaded = ref(false)
  const designerReady = ref(false)
const tenantPlugins = ref([])
const tenantTemplate = ref()
const printData = ref()

async function loadTenantDesigner(tenantId: string) {
  const config = await api.get(`/tenants/${tenantId}/print-designer`)
  tenantPlugins.value = config.plugins
  tenantTemplate.value = config.template
  printData.value = config.printData
    configLoaded.value = true
}
```

`plugins`、`template` 支持异步更新；接口返回后重新赋值即可刷新左侧组件和画布。

界面模块也可以按项目参数裁剪或改名：

```vue
<Designer
  :modules="{
    toolbar: true,
    palette: true,
    canvasToolbar: false,
    properties: true,
    footer: true,
    labels: { palette: '字段库', properties: '字段属性' }
  }"
/>
```

需要完全替换某个区域时，可使用 `toolbar`、`palette`、`canvas-toolbar`、`properties`、`footer` 插槽。缺少引擎面板容器时使用隐藏容器，不影响画布初始化；挂载节点规则见文末说明。

也可以使用插件安装方式：

```ts
import DesignerPlugin from '@print-designer/designer'
app.use(DesignerPlugin)
```

## 独立打印样式

只展示 `getHtml()` 返回的打印片段时，将 `dist-lib/print-lock.css` 复制到业务项目静态目录并在页面入口加入：

```html
<link rel="stylesheet" href="/print-lock.css">
```

无需加载设计器组件或完整 `style.css`。不指定 `media`，样式才能用于屏幕展示和打印；也可以使用 `import '@print-designer/designer/print-lock.css'`。iframe、新窗口需要在各自文档中加载；`getFullHtml()` 和组件发起的打印已内嵌该 CSS。直接调用底层客户端接口且未传 `styleHandler` 时，还需额外加入 `<link rel="stylesheet" href="/print-lock.css" media="print">`，供旧接口查找。

`registerPlugin()` 注册的插件在创建组件时复制到实例；请在组件挂载前注册。Vue 2 从 `@print-designer/designer-vue2` 导入该方法。运行期间增删插件使用组件的 `plugins` 参数。每个实例独立注册，导出的模板仍使用稳定的 `business.*` 标识。

自定义 palette、properties、footer 插槽无需保留内部节点。需要显示引擎面板时，在插槽中提供 `.hiprintEpContainer`、`.hiprint-settings`、`.hiprint-pagination` 容器；未提供时由组件创建隐藏容器。容器应在挂载时存在并保持稳定。
