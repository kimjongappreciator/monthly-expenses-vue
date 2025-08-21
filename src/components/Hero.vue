<script setup lang="ts">
import { useMonthStore } from '@/models/monthsStore';
import Separator from './ui/separator/Separator.vue';
import { BadgeDollarSign, BadgeInfo, HandCoins, Wallet } from 'lucide-vue-next';
import { computed} from 'vue';

const store = useMonthStore();

const totalIncome = computed(() => store.getYearlyBalance().totalIncome);
const totalExpenses = computed(() => store.getYearlyBalance().totalExpenses);
const transactionNumber = computed(() => store.getYearlyBalance().transactionNumber);
const balance = computed(() => store.getYearlyBalance().balance);

const getBalanceColor = (balance: number) => {
    if (balance > 0) return 'text-[var(--up-color)]';
    if (balance < 0) return 'text-[var(--down-color)]';
    return 'text-gray-500';
};

</script>
<template>
    <div class="w-full max-w-sm mx-auto  m-15">

        <h2 class="text-lg font-semibold text-center mb-4">Resumen anual</h2>

        <div class="flex items-center mb-6 justify-between">
            <div class="text-center">
                <BadgeDollarSign class="mx-auto mb-4 text-3xl text-[var(--up-color)]" />
                <h1 class="text-sm text-gray-500 text-center">Ingresos</h1>
                <span class="text-sm font-medium text-[var(--up-color)]">
                    {{ totalIncome.toLocaleString() }}
                </span>
            </div>
            <div class="text-center">
                <BadgeInfo class="mx-auto mb-4 text-3xl text-[var(--down-color)]" />
                <h1 class="text-sm text-gray-500 text-center">Gastos</h1>
                <span class="text-sm font-medium text-[var(--down-color)]">
                    {{ totalExpenses.toLocaleString() }}
                </span>
            </div>
            <div class="text-center">
                <Wallet class="mx-auto mb-4 text-3xl" />
                <h1 class="text-sm text-gray-500 text-center">Transacciones</h1>
                <span class="text-base font-semibold">
                    {{ transactionNumber.toLocaleString() }}
                </span>
            </div>
            <div class="text-center">
                <HandCoins class="mx-auto mb-4 text-3xl" :class="getBalanceColor(balance)" />
                <h1 class="text-sm text-gray-500 text-center">Balance</h1>
                <span class="text-base font-semibold" :class="getBalanceColor(balance)">
                    {{ balance.toLocaleString() }}
                </span>
            </div>
        </div>

        <Separator class="my-4" />



    </div>
</template>