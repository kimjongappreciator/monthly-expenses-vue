<script setup lang="ts">
import { DonutChart } from "@/components/ui/chart-donut"
import { useMonthStore } from "@/models/monthsStore"

const props = defineProps<{
    monthId: number
}>()

const expenses = useMonthStore().getExpenses(props.monthId) ?? []
const income = useMonthStore().getIncome(props.monthId) ?? []

function generateColors(num: number = 3, transType: 'income' | 'expenses' = 'income') {

    const primaryColor = transType === 'income' ? '--chart-income-primary' : '--chart-expense-primary'
    const secondaryColor = transType === 'income' ? '--chart-income-secondary' : '--chart-expense-secondary'

    const count = num
    const quotient = Math.floor(count / 2)
    const remainder = count % 2

    const primaryCount = quotient + remainder
    const secondaryCount = quotient
    const colors = [...Array.from(new Array(primaryCount).keys()).map(i => `hsl(var(${primaryColor}) / ${1 - (1 / primaryCount) * i})`),
    ...Array.from(new Array(secondaryCount).keys()).map(i => `hsl(var(${secondaryColor}) / ${1 - (1 / secondaryCount) * i})`),]

    return colors
}

const expensesColors = generateColors(expenses.length, 'expenses')
const incomeColors = generateColors(income.length)


function valueFormatter(tick: number | Date) {
    return typeof tick === "number"
        ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}`
        : ""
}
</script>

<template>

    <div class="flex flex-col md:flex-row justify-between">
        <div class="flex flex-col md:flex-row gap-4">

            <div class="text-center">
                <h1 class="pb-2">Ingresos</h1>
                <DonutChart index="name" :category="'amount'" :data="income" :value-formatter="valueFormatter"
                    :colors="incomeColors" />
                <p v-if="income.length === 0" class="text-sm"> No registra ingresos</p>
            </div>

            <div class="text-center">
                <h1 class="pb-2">Gastos</h1>
                <DonutChart index="name" :category="'amount'" :data="expenses" :value-formatter="valueFormatter"
                    :colors="expensesColors" />
                <p v-if="expenses.length === 0" class="text-sm"> No registra gastos</p>
            </div>

        </div>
    </div>



</template>