<template>
  <div>
    <button @click="logoutAndGoHome">Logout</button>
    <button @click="$router.push('/add')">+ Add Recipe</button>
    <h2>My Recipe Collection</h2>
    <div class="recipes">
      <div v-for="recipe in recipes" :key="recipe.id" class="card" @click="$router.push(`/recipe/${recipe.id}`)">
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.description }}</p>
        <p>{{ recipe.cooking_time }} min | {{ recipe.servings }} servings</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { authHeaders, logout } from '../auth'
import { useRouter } from 'vue-router'

const recipes = ref([])
const router = useRouter()

function logoutAndGoHome() {
  logout()
  router.push('/')
}

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/recipes', { headers: authHeaders() })
  recipes.value = res.data
})
</script>
<style scoped>
.recipes { display: flex; gap: 1em; flex-wrap: wrap; }
.card { background: #eee; padding: 1em; border-radius: 8px; width: 200px; cursor: pointer; }
</style>