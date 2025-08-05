import { ref } from 'vue';
import type { MonthModel } from "./MonthModel";

export const months = ref<MonthModel[]>([
    {
        id: 1,
        name: 'Enero',
        description: 'Mes de enero',
        year: 2021,
        days: 31,
        income: undefined,
        expenses: undefined
    },
    {
        id: 2,
        name: 'Febrero',
        description: 'Mes de febrero',
        year: 2021,
        days: 28,
        income: undefined,
        expenses: undefined
    },
    {
        id: 3,
        name: 'Marzo',
        description: 'Mes de marzo',
        year: 2021,
        days: 31,
        income: undefined,
        expenses: undefined
    },
    {
        id: 4,
        name: 'Abril',
        description: 'Mes de abril',
        year: 2021,
        days: 30,
        income: undefined,
        expenses: undefined
    },
    {
        id: 5,
        name: 'Mayo',
        description: 'Mes de mayo',
        year: 2021,
        days: 31,
        income: undefined,
        expenses: undefined
    },
    {
        id: 6,
        name: 'Junio',
        description: 'Mes de junio',
        year: 2021,
        days: 30,
        income: undefined,
        expenses: undefined
    }   

]);