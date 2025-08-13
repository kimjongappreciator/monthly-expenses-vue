<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Dialog from './ui/dialog/Dialog.vue';
import DialogContent from './ui/dialog/DialogContent.vue';
import DialogHeader from './ui/dialog/DialogHeader.vue';
import DialogTitle from './ui/dialog/DialogTitle.vue';
import DialogFooter from './ui/dialog/DialogFooter.vue';
import Tabs from './ui/tabs/Tabs.vue';
import TabsList from './ui/tabs/TabsList.vue';
import TabsTrigger from './ui/tabs/TabsTrigger.vue';
import TabsContent from './ui/tabs/TabsContent.vue';
import TransactionList from './TransactionList.vue';
import MonthStats from './MonthStats.vue';


const props = defineProps<{ open: boolean, monthId: number }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void }>()

const close = () => emit('update:open', false)
</script>

<template>
  <Dialog :open="props.open" @update:open="close">
    <DialogContent class="w-auto min-w-fit">
      <DialogHeader>
        <DialogTitle class="text-center">Detalles</DialogTitle>
      </DialogHeader>
      <div class="w-auto px-4 py-6">
        <Tabs default-value="stats" class="w-full md:w-fit">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Estadisticas</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <h1 class="text-lm mb-4 text-center"> Graficos detallados del mes </h1>
            <MonthStats :month-id="monthId" />
          </TabsContent>
          <TabsContent value="transactions"> Contenido de Transacciones
            <TransactionList :month-id="monthId" />
          </TabsContent>
        </Tabs>
      </div>
      <DialogFooter> </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
