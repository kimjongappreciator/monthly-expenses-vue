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

const props = defineProps<{
    monthId: number
}>()

const monthlyIncome = useMonthStore().getIncome(props.monthId) ?? []
const monthlyExpenses = useMonthStore().getExpenses(props.monthId) ?? []

const defaultValue = "1"
const accordionItems = [
    { value: "1", title: "Ingresos", content: monthlyIncome },
    { value: "2", title: "Gastos", content: monthlyExpenses }
]
</script>
<template>
  <Accordion type="single" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        <div class="overflow-x-auto">
          <Table class="w-full">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[80px]">Nombre</TableHead>
                <TableHead class="min-w-[60px]">Tipo</TableHead>
                <TableHead class="min-w-[100px] hidden sm:table-cell">Descripción</TableHead>
                <TableHead class="min-w-[80px]">Fecha</TableHead>
                <TableHead class="text-right min-w-[70px]">Monto</TableHead>
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
                    {{ e.category.name }}
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
                      day: '2-digit', 
                      month: '2-digit' 
                    }) }}
                  </div>
                </TableCell>
                <TableCell class="text-right font-medium">
                  {{ e.amount }}
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
