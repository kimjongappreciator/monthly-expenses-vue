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


const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void }>()

const close = () => emit('update:open', false)
</script>

<template>
  <Dialog :open="props.open" @update:open="close">    
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalles del mes</DialogTitle>
      </DialogHeader>
      <div class="w-full px-4 py-6">
      <Tabs default-value="details" class="w-auto">
        <TabsList>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
            Contenido de Detalles
        </TabsContent>
        <TabsContent value="transactions">
            Contenido de Transacciones
        </TabsContent>
      </Tabs>     <!-- Aquí pones tu contenido -->
      
        <!-- Mostrar detalles del mes -->
      </div>

      <DialogFooter>        
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
