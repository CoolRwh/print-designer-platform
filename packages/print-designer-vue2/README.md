# @print-designer/designer-vue2

Vue 2.6 兼容版打印设计器，使用 Options API。

```js
import Designer from '@print-designer/designer-vue2'
Vue.use(Designer)
```

```vue
<Designer :plugins="plugins" :template="template" :data="printData"
  @template-change="onTemplateChange" @save="onSave" />
```

构建：`pnpm build:vue2`。
