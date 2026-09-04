<script setup lang="ts">
import { ref } from 'vue'
import type { BusinessField, BusinessPlugin } from '../core/types'

defineProps<{ plugins: BusinessPlugin[] }>()
const emit = defineEmits<{ close: []; add: [plugin: BusinessPlugin]; remove: [id: string] }>()
const id = ref('')
const name = ref('')
const icon = ref('◆')
const color = ref('#3b82f6')
const fieldsJson = ref('[{"key":"custom.field","label":"自定义字段","kind":"text","sample":"示例内容"}]')
const error = ref('')

function submit() {
  try {
    if (!/^[a-zA-Z][\w-]*$/.test(id.value)) throw new Error('插件 ID 只能包含字母、数字、下划线或短横线')
    if (!name.value.trim()) throw new Error('请输入插件名称')
    const fields = JSON.parse(fieldsJson.value) as BusinessField[]
    if (!Array.isArray(fields) || !fields.length) throw new Error('至少需要一个字段')
    emit('add', { id: id.value, name: name.value, icon: icon.value, color: color.value, fields, sampleData: {} })
    emit('close')
  } catch (reason) { error.value = reason instanceof Error ? reason.message : '插件配置无效' }
}
</script>

<template>
  <div class="plugin-mask" @click.self="emit('close')">
    <section class="plugin-dialog">
      <header><strong>插件管理</strong><button @click="emit('close')">×</button></header>
      <div class="plugin-list">
        <div v-for="plugin in plugins" :key="plugin.id"><span>{{ plugin.icon }} {{ plugin.name }}</span><button @click="emit('remove', plugin.id)">删除</button></div>
      </div>
      <label>插件 ID<input v-model.trim="id" placeholder="例如 tenant_product" /></label>
      <label>插件名称<input v-model.trim="name" placeholder="例如 商品扩展" /></label>
      <div class="plugin-row"><label>图标<input v-model="icon" /></label><label>颜色<input v-model="color" type="color" /></label></div>
      <label>字段 JSON<textarea v-model="fieldsJson" rows="7" /></label>
      <p v-if="error" class="plugin-error">{{ error }}</p>
      <footer><button @click="emit('close')">取消</button><button class="plugin-primary" @click="submit">新增插件</button></footer>
    </section>
  </div>
</template>

<style scoped>
.plugin-mask{position:fixed;inset:0;z-index:9999;background:#0009;display:grid;place-items:center}.plugin-dialog{width:min(560px,90vw);background:#172130;color:#e8eef7;border:1px solid #34445b;border-radius:10px;padding:18px;box-shadow:0 18px 60px #0008}.plugin-dialog header,.plugin-dialog footer,.plugin-list div,.plugin-row{display:flex;align-items:center;gap:12px}.plugin-dialog header{justify-content:space-between;margin-bottom:14px}.plugin-dialog label{display:grid;gap:5px;margin:10px 0;flex:1}.plugin-dialog input,.plugin-dialog textarea{box-sizing:border-box;width:100%;background:#0f1722;color:#fff;border:1px solid #34445b;border-radius:5px;padding:8px}.plugin-list{max-height:120px;overflow:auto}.plugin-list div{justify-content:space-between;padding:6px 0;border-bottom:1px solid #29384b}.plugin-dialog button{border:0;border-radius:4px;padding:6px 12px;cursor:pointer}.plugin-dialog footer{justify-content:flex-end;margin-top:14px}.plugin-primary{background:#2563eb;color:#fff}.plugin-error{color:#fb7185}
</style>
