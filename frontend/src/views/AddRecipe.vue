<template>
  <div>
    <h2>Add New Recipe</h2>
    <form @submit.prevent="submit">
      <input v-model="form.title" placeholder="Recipe Title" required />
      <textarea v-model="form.description" placeholder="Description"></textarea>
      <input v-model.number="form.cooking_time" type="number" placeholder="Cooking Time (minutes)" />
      <input v-model.number="form.servings" type="number" placeholder="Servings" />

      <h4>Ingredients</h4>
      <div v-for="(ing, i) in form.ingredients" :key="i">
        <input v-model="ing.name" placeholder="e.g. 2 cups flour" />
        <button type="button" @click="removeIngredient(i)">Remove</button>
      </div>
      <button type="button" @click="addIngredient">+ Add Ingredient</button>

      <h4>Instructions</h4>
      <div v-for="(step, i) in form.steps" :key="i">
        <input v-model="step.description" placeholder="Describe the step..." />
        <button type="button" @click="removeStep(i)">Remove</button>
      </div>
      <button type="button" @click="addStep">+ Add Step</button>

      <button type="submit">Save Recipe</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { authHeaders } from '../auth'
import { useRouter } from 'vue-router'

const form = ref({
  title: '', description: '', cooking_time: 0, servings: 1,
  ingredients: [{ name: '' }],
  steps: [{ description: '' }]
})
const router = useRouter()

function addIngredient() { form.value.ingredients.push({ name: '' }) }
function removeIngredient(i) { form.value.ingredients.splice(i, 1) }
function addStep() { form.value.steps.push({ description: '' }) }
function removeStep(i) { form.value.steps.splice(i, 1) }

async function submit() {
  await axios.post('http://localhost:3001/api/recipes', form.value, { headers: authHeaders() })
  router.push('/dashboard')
}
</script>