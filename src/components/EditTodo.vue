<template>
    <input type="text" :value="todoTitle" @input="onInputChange" v-bind="$attrs">
</template>

<script setup>
import { toRef } from 'vue';

const props = defineProps({
  todoTitle: {
    type: String,
    default: true
  }
})
const emit = defineEmits(['update:todoTitle'])
const onInputChange = (e) => {
  emit('update:todoTitle', e.target.value)
}
</script>

<style scoped>

</style>