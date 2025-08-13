<script setup lang="ts">
import { DonutChart } from "@/components/ui/chart-donut"
import { useMonthStore } from "@/models/monthsStore"

const expenses = useMonthStore().getExpenses(1) ?? []
const income = useMonthStore().getIncome(1) ?? []

const total = expenses.concat(income);
console.log(total);

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 2000) + 500,
        status: "up",
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
        status: "up",
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
        status: "down",
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
        status: "up",
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
        status: "down",
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
        status: "up",
    },
]

function valueFormatter(tick: number | Date) {
    return typeof tick === "number"
        ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}`
        : ""
}
</script>

<template>
    <DonutChart index="name" :category="'total'" :data="data" :value-formatter="valueFormatter"/>
</template>