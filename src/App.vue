<script setup>
import { reactive} from 'vue';
import EditTodo from './components/EditTodo.vue';
// import EditTodo from './components/EditTodo.vue';
import AddListVue from './components/addList.vue.vue'
import Filters from './components/Filters.vue';
import {useTodos} from './components/useTodos.js'
import {useFilter} from './components/useFilter.js'
const todoState = reactive({
  newTodo: '',
  editedTodo: null, //正在编辑的todo
})
const {todos, addList, removlist } = useTodos(todoState)
const state = useFilter(todos)


</script>

<template>
  <EditTodo v-model:todoTitle="todoState.newTodo" @keyup.enter="addList" autoFocus placeholder="新增待办" autocomplete="off"></EditTodo>
  <ul>
    <AddListVue v-for="list in state.filterdTodos" :key="list.id" :list="list" v-model:editedTodo="todoState.editedTodo" @remove-todo="removlist"></AddListVue>
  </ul>
  <Filters :items="state.filtersItem" v-model="state.visibility"></Filters>
</template>

<style scoped>

</style>
