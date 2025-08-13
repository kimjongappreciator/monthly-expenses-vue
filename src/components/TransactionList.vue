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
                <!-- Contenedor scroll horizontal -->
                <div class="overflow-x-auto">
                    <Table class="min-w-[600px]">
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[100px]">Nombre</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead class="text-right">Monto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="e in item.content" :key="item.value">
                                <TableCell class="font-medium">{{ e.name }}</TableCell>
                                <TableCell>{{ e.category.name }}</TableCell>
                                <TableCell class="max-w-[200px] whitespace-normal break-words">
                                    {{ e.description }}
                                </TableCell>
                                <TableCell>{{ e.date.toDateString() }}</TableCell>
                                <TableCell class="text-right">{{ e.amount }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>
<style scoped></style>
