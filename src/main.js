import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import EditTodo from './components/EditTodo.vue'

createApp(App).component('EditTodo',EditTodo).mount('#app')
