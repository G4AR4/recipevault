<template>
  <div v-if="recipe">
    <h2>{{ recipe.title }}</h2>
    <p>{{ recipe.description }}</p>
    <p>Cooking Time: {{ recipe.cooking_time }} min | Servings: {{ recipe.servings }}</p>
    <h4>Ingredients</h4>
    <ul><li v-for="(ing, i) in recipe.ingredients" :key="i">{{ ing.name }}</li></ul>
    <h4>Instructions</h4>
    <ol><li v-for="(step, i) in recipe.steps" :key="i">{{ step.description }}</li></ol>
    <button @click="$router.push('/dashboard')">Back</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { authHeaders } from '../auth'
import { useRoute } from 'vue-router'

const recipe = ref(null)
const route = useRoute()
onMounted(async () => {
  const res = await axios.get(`http://localhost:3001/api/recipes/${route.params.id}`, { headers: authHeaders() })
  recipe.value = res.data
})
</script>