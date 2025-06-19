<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ currentTheme === 'dark' ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTheme = ref('system')

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
    currentTheme.value = 'light'
  } else if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
    currentTheme.value = 'dark'
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.removeItem('theme')
    currentTheme.value = 'system'
  }
}

function toggleTheme() {
  if (currentTheme.value === 'dark') setTheme('light')
  else setTheme('dark')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) setTheme(saved)
  else {
    // Respect system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark')
    else setTheme('light')
  }
})
</script>

<style>
.theme-toggle {
  margin: 0.5em;
  padding: 0.5em 1.2em;
  border-radius: 5px;
  border: none;
  background: var(--secondary);
  color: var(--primary);
  cursor: pointer;
  font-size: 1em;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.2s, color 0.2s;
}
.theme-toggle:hover {
  background: var(--accent);
  color: var(--primary);
}
</style>