<template>
  <div class="login-container">
    <div>
      <button @click="mode='login'" :class="{active: mode==='login'}">Login</button>
      <button @click="mode='register'" :class="{active: mode==='register'}">Register</button>
    </div>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" placeholder="Email Address" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">{{ mode === 'login' ? 'Login' : 'Register' }}</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login, register } from '../auth'
import { useRouter } from 'vue-router'

const mode = ref('login')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleSubmit() {
  try {
    if (mode.value === 'login') {
      await login(email.value, password.value)
      router.push('/dashboard')
    } else {
      await register(email.value, password.value)
      mode.value = 'login'
    }
  } catch (e) {
    error.value = e.response?.data?.error || 'Error'
  }
}
</script>
<style scoped>
.login-container { max-width: 400px; margin: auto; }
.active { font-weight: bold; }
.error { color: red; }
</style>