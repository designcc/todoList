import { ref,watchEffect } from "vue"
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem('todos')||'[]')
    todos.forEach((todo,index)=> {
      todos.id = index + 1
    })
    return todos
  },
  save(todos) {
    localStorage.setItem('todos',JSON.stringify(todos))
  }
}
export function useTodos(state){
  const todos = ref(todoStorage.fetch())
  const removlist = (list) => {
    todos.value.splice(todos.value.indexOf(list),1)
  }
  const addList = () => {
    todos.value.push({
      id: todos.value.length + 1,
      text: state.newTodo,
      completed: false
    })
    state.newTodo = ''
  }
  watchEffect(()=> {
    todoStorage.save(todos.value)
  })
  return {todos, removlist,addList}
}