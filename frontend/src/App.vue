<template>
  <header style="display: flex; align-items: center; gap: 1em; padding: 1em;">
    <ThemeToggle />
    <!-- Add your site navigation here -->
  </header>
  <router-view />
</template>

<script setup>
import ThemeToggle from './components/ThemeToggle.vue'
</script>
