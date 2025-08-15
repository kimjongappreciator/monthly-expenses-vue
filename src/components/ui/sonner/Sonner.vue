<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { Toaster as Sonner } from "vue-sonner"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :style="{
      '--normal-bg': 'var(--sonner-ok-background)',
      '--normal-text': 'var(--sonner-ok-foreground)',
      '--normal-border': 'var(--sonner-ok-border)',

    }"
  />
</template>
