<script setup>
import { reactive, computed, watchEffect } from 'vue';
import EditTodo from './components/EditTodo.vue';
const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  }
}
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem('todos')||'[]')
    todos.forEach((todo,index)=> {
      todos.id = index + 1
    })
    return todos
  },
  save() {
    localStorage.setItem('todos',JSON.stringify(state.todos))
  }
}
const state = reactive({
  newTodo: '',
  todos: todoStorage.fetch(),
  beforeEditCache: '', //缓存编辑前的title
  editedTodo: null, //正在编辑的todo
  visibility: 'all',
  filterdTodos: computed(() => {
    return filters[state.visibility](state.todos)
  })
})
watchEffect(()=> {
  todoStorage.save(state.todos)
})
const addList = () => {
  state.todos.push({
    id: state.todos.length + 1,
    text: state.newTodo,
    completed: false
  })
  state.newTodo = ''
}
const removlist = (list) => {
  state.todos.splice(state.todos.indexOf(list), 1)
}
const editTodo = (list) => {
  state.beforeEditCache = list.text
  state.editedTodo = list
}
const celEdit = (list) => {
  list.text = state.beforeEditCache
  state.editedTodo = null
}
const doneEdit = (list) => {
  state.editedTodo = null
}
const vFocus = {
  mounted: (el) => {
    el.focus()
  }
}
</script>

<template>
  <EditTodo v-model:todoTitle="state.newTodo" @keyup.enter="addList" autoFocus placeholder="新增待办" autocomplete="off"></EditTodo>
  <ul>
    <li v-for="list in state.filterdTodos" :key="list.id"
      :class="{ completed: list.completed, deitting: list === state.editedTodo }">
      <div class="view">
        <input type="checkbox" v-model="list.completed">
        <label @dblclick="editTodo(list)">{{ list.text }}</label>
        <button @click="removlist(list)">x</button>
      </div>
      <input type="text" class="edit" v-focus="list === state.editedTodo" v-model="list.text" @blur="doneEdit(list)"
        @keyup.enter="doneEdit(list)" @keyup.escelEdit="celEdit(list)">
    </li>
  </ul>
  <div class="filters">
    <span @click="state.visibility = 'all'" :class="{selected: state.visibility === 'all'}">All</span>
    <span @click="state.visibility = 'active'" :class="{selected: state.visibility === 'active'}">active</span>
    <span @click="state.visibility = 'completed'" :class="{selected: state.visibility === 'completed'}">completed</span>
  </div>
</template>

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

.filters> span{
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filters> span.selected  {
  border: 1px solid salmon;
}
</style>
