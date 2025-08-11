<script setup lang="ts">
import MonthCard from './MonthCard.vue';
import { months } from '@/models/Months';

defineProps<{ msg: string }>()


</script>

<template>
  <h1 class="text-center"> Bienvenido {{ msg }}</h1>
  <div class="flex flex-wrap justify-center gap-4">
    <div v-for="(month, index) in months" :key="index" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-2">
      <MonthCard :month="month"></MonthCard>
    </div>
  </div>

</template>

<style scoped></style>
