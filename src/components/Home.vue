<script setup lang="ts">
import { useMonthStore } from "@/models/monthsStore";
import MonthCard from "./MonthCard.vue";
import Carousel from "./ui/carousel/Carousel.vue";
import CarouselContent from "./ui/carousel/CarouselContent.vue";
import CarouselItem from "./ui/carousel/CarouselItem.vue";
import CarouselPrevious from "./ui/carousel/CarouselPrevious.vue";
import CarouselNext from "./ui/carousel/CarouselNext.vue";
import Hero from "./Hero.vue";

const monthsStore = useMonthStore();
</script>

<template> 

  <div class="flex justify-center">
    <Hero></Hero>
  </div>

  <h2 class="text-lg font-semibold text-center mb-4">Resumen Mensual</h2>
  <div class="flex flex-wrap justify-center gap-4">
    <Carousel>
      <CarouselContent class="w-100 md:w-100">
        <CarouselItem v-for="(month, index) in monthsStore.months" :key="index">
          <MonthCard :month="month"></MonthCard>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <!--
    <div v-for="(month, index) in monthsStore.months" :key="index" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-2">
      <MonthCard :month="month"></MonthCard>
    </div>-->
  </div>  
</template>

<style scoped>
</style>
