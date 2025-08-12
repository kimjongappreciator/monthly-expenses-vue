import { expenses } from "./Expenses";
import { incomes } from "./Income";
import type { MonthModel } from "./MonthModel";

export const months : MonthModel[] = [
    {
        id: 1,
        name: 'Enero',
        description: 'Mes de enero',
        year: 2021,
        days: 31,
        income: incomes,
        expenses: expenses,
        totalIncome: incomes.reduce((sum, income) => sum + income.amount, 0),
        totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0),
        balance: 0
    },
    {
        id: 2,
        name: 'Febrero',
        description: 'Mes de febrero',
        year: 2021,
        days: 28,
        income: [],
        expenses: [],
        totalIncome: 10,
        totalExpenses: 30,
        balance: 0
    },
    {
        id: 3,
        name: 'Marzo',
        description: 'Mes de marzo',
        year: 2021,
        days: 31,
        income: [],
        expenses: [],
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    },
    {
        id: 4,
        name: 'Abril',
        description: 'Mes de abril',
        year: 2021,
        days: 30,
        income: [],
        expenses: [],
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    },
    {
        id: 5,
        name: 'Mayo',
        description: 'Mes de mayo',
        year: 2021,
        days: 31,
        income: [],
        expenses: [],
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    },
    {
        id: 6,
        name: 'Junio',
        description: 'Mes de junio',
        year: 2021,
        days: 30,
        income: [],
        expenses: [],
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    },
    {
        id: 7,
        name: 'Julio',
        description: 'Mes de julio',
        year: 2021,
        days: 30,
        income: [],
        expenses: [],
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    }   

];