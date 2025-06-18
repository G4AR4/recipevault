import { createRouter, createWebHistory } from 'vue-router'
import LoginRegister from './views/LoginRegister.vue'
import Dashboard from './views/Dashboard.vue'
import AddRecipe from './views/AddRecipe.vue'
import RecipeDetail from './views/RecipeDetail.vue'

const routes = [
  { path: '/', component: LoginRegister },
  { path: '/dashboard', component: Dashboard },
  { path: '/add', component: AddRecipe },
  { path: '/recipe/:id', component: RecipeDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router