<script setup lang="ts">
import type { MonthModel } from '@/models/MonthModel';
import Card from './ui/card/Card.vue';
import CardContent from './ui/card/CardContent.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardFooter from './ui/card/CardFooter.vue';
import Button from './ui/button/Button.vue';
import { Check, ChevronDown, ChevronUp, Plus } from 'lucide-vue-next';
import MonthDetails from '../components/MonthDetails.vue';
import { ref } from 'vue';



defineProps<{
    month: MonthModel
}>();

const openDetails = ref(false);

const getBalanceColor = (balance: number) => {
    if (balance > 0) return 'text-[var(--up-color)]';
    if (balance < 0) return 'text-[var(--down-color)]';
    return 'text-gray-500';
};

</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ month.name }}</CardTitle>            
        </CardHeader>
        <CardContent>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Ingresos</span>
                <span class="text-lg font-semibold flex"> {{ month.totalIncome }}
                    <ChevronUp class="ml-1.5 pt-2"/>
                </span>

            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Gastos</span>
                <span class="text-lg font-semibold flex">{{ month.totalExpenses }}
                    <ChevronDown class="ml-1.5 pt-2"/>
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Balance total</span>
                <span class="text-lg font-semibold flex" :class="getBalanceColor(month.totalIncome - month.totalExpenses)">
                    <Plus class="pt-2" v-if="month.totalIncome - month.totalExpenses > 0" />                    
                    {{
                    month.totalIncome - month.totalExpenses }}</span>
            </div>

        </CardContent>
        <CardFooter class="flex flex-wrap justify-between gap-1">            
            <Button class="w-30" variant="outline" size="sm" @click="openDetails = true">
                <Check class="mr-2 h-4 w-2" /> Detalles
            </Button>
        </CardFooter>
        
    </Card>

    <MonthDetails v-model:open="openDetails" :month-id="month.id"></MonthDetails>    

</template>
