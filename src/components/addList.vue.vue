<template>
  <li
    :class="{ completed: list.completed, deitting: list === editedTodo }">
    <div class="view">
      <input type="checkbox" v-model="list.completed">
      <label @dblclick="editTodo(list)">{{ list.text }}</label>
      <button @click="removlist(list)">x</button>
    </div>

    <EditTodo class="edit" v-focus="list === editedTodo" v-model:todoTitle="list.text" @blur="doneEdit(list)"
      @keyup.enter="doneEdit(list)" @keyup.escelEdit="celEdit(list)"></EditTodo>
  </li>
</template>

<script setup>
import {reactive} from 'vue'
const state = reactive({
  beforeEditCache: '', //缓存编辑前的title
})
const props = defineProps({
  list: {
    type: Object,
    required:true
  },
  editedTodo: {
    type: Object
  }
})
const emit = defineEmits(['remove-todo','update:edited-todo'])
const removlist = (list) => {
  emit('remove-todo', list)
}
const editTodo = (list) => {
  state.beforeEditCache = list.text
  emit('update:edited-todo',list)
}
const celEdit = (list) => {
  list.text = state.beforeEditCache
  emit('update:edited-todo', null)
}
const doneEdit = (list) => {
  emit('update:edited-todo', null)
}

const vFocus = {
  mounted: (el) => {
    el.focus()
  }
}
</script>

<style scoped>
li {
  list-style: none;
}

.completed label {
  text-decoration: line-through;
}

.edit,
.deitting .view {
  display: none;
}

.view,
.deitting .edit {
  display: block;
}
</style>