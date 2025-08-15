<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import Home from './components/Home.vue';
import ThemeToggle from './components/ui/ThemeToggle.vue';
import 'vue-sonner/style.css'

</script>
<template>
  <Toaster position="top-center"/>
  <ThemeToggle></ThemeToggle>
  <Home msg="Usuario" />
</template>

<style scoped>
</style>
