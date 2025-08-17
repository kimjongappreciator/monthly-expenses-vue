<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useMonthStore } from "@/models/monthsStore";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Button from "./ui/button/Button.vue";
import { Plus, Trash } from "lucide-vue-next";
import NewRecord from "./NewRecord.vue";
import Dialog from "./ui/dialog/Dialog.vue";
import DialogTrigger from "./ui/dialog/DialogTrigger.vue";
import DialogContent from "./ui/dialog/DialogContent.vue";
import DialogTitle from "./ui/dialog/DialogTitle.vue";
import { computed } from "vue";


const props = defineProps<{
  monthId: number
}>()

const store = useMonthStore();

const monthlyIncome = computed(() => store.getIncome(props.monthId) ?? [])
const monthlyExpenses = computed(() => store.getExpenses(props.monthId) ?? [])

const defaultValue = "1"
const accordionItems = computed(() => [
  { value: "1", title: "Ingresos", content: monthlyIncome.value },
  { value: "2", title: "Gastos", content: monthlyExpenses.value }
])

function handleDelete(id: number, transType:string) : void {
  if (transType === '1') {
    useMonthStore().deleteIncome(props.monthId, id)
  } else if (transType === '2') {
    useMonthStore().deleteExpense(props.monthId, id)
  }  
}

</script>
<template>
  <Accordion type="single" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        <div class="overflow-x-auto">
          <Table class="w-full">
            <TableCaption>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="outline">
                    Nuevo
                    <Plus class="h-4 w-4" />
                  </Button>
                </DialogTrigger>                
                <DialogContent>
                  <DialogTitle>Agregar item</DialogTitle>
                  <NewRecord :type="item.value === '1' ? 'income' : 'expense'" :month-id="props.monthId" />
                </DialogContent>
              </Dialog>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[80px]">Nombre</TableHead>
                <TableHead class="min-w-[60px]">Tipo</TableHead>
                <TableHead class="min-w-[100px] hidden sm:table-cell">Descripción</TableHead>
                <TableHead class="min-w-[80px]">Dia</TableHead>
                <TableHead class="text-right min-w-[70px]">Monto</TableHead>
                <TableHead class="text-right min-w-[25px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="e in item.content" :key="item.value">
                <TableCell class="font-medium">
                  <div class="truncate max-w-[100px] sm:max-w-none">
                    {{ e.name }}
                  </div>
                </TableCell>
                <TableCell>
                  <div class="truncate max-w-[60px] sm:max-w-none">
                    {{ e.category }}
                  </div>
                </TableCell>
                <TableCell class="hidden sm:table-cell">
                  <div class="max-w-[200px] whitespace-normal break-words">
                    {{ e.description }}
                  </div>
                </TableCell>
                <TableCell>
                  <div class="text-xs sm:text-sm">
                    {{ new Date(e.date).toLocaleDateString('es-ES', {
                      day: '2-digit'                      
                    }) }}
                  </div>
                </TableCell>
                <TableCell class="text-right font-medium">
                  {{ e.amount }}
                </TableCell>
                <TableCell class="text-center">
                  <Button variant="ghost" size="icon" class="h-4 w-4" @click="handleDelete(e.id, item.value)">
                    <Trash class="h-2 w-2" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
<style scoped></style>
