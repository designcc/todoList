import { reactive, computed } from "vue"
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
export function useFilter(todos) {
  const state = reactive({
    filtersItem: [
      {label:'All',value: 'all'},
      {label:'Active',value: 'active'},
      {label:'Completed',value: 'completed'}
    ],
    visibility: 'all',
    filterdTodos: computed(() => {
      return filters[state.visibility](todos.value)
    })
  })
  return state
}