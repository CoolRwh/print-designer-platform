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
import { Designer } from 'hiprint-business-designer'
import 'hiprint-business-designer/style.css'

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

也可以在组件挂载前注册自定义业务插件：

```ts
import { registerPlugin } from 'hiprint-business-designer'

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

需要完全替换某个区域时，可使用 `toolbar`、`palette`、`canvas-toolbar`、`properties`、`footer` 插槽；替换区域时请保留 `.hiprintEpContainer`、`#hiprint-canvas`、`#hiprint-settings` 和 `#hiprint-pagination` 这些挂载节点。

也可以使用插件安装方式：

```ts
import DesignerPlugin from 'hiprint-business-designer'
app.use(DesignerPlugin)
```
