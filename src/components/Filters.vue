<template>
  <div class="filters">
    <span v-for="i in items" @click="$emit('update:modelValue', i.value)" :class="{selected: modelValue === i.value}">{{i.label}}</span>
  </div>
</template>

<script setup>
  const props = defineProps(['items', 'modelValue'])
  const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

.filters> span{
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filters> span.selected  {
  border: 1px solid salmon;
}
</style>