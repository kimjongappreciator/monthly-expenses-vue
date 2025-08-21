// stores/monthStore.ts
import { defineStore } from 'pinia'
import type { MonthModel, transactionModel } from '@/models/MonthModel'
import { months } from './Months'

export const useMonthStore = defineStore('monthStore', {
  state: () => ({
    months: months as MonthModel[]
  }),
  actions: {
    setMonths(newMonths: MonthModel[]) {
      this.months = newMonths
    },
    updateMonth(id: number, data: Partial<MonthModel>) {
      const index = this.months.findIndex(m => m.id === id);
      if (index !== -1) {
        this.months[index] = { ...this.months[index], ...data }
      }
    },
    newIncome(id: number, income: transactionModel) {
      console.log(id, income)
      const index = this.months.findIndex(m => m.id === id);
      if (index !== -1) {
        this.months[index].income.push(income);
        this.months[index].totalIncome = this.months[index].income.reduce((sum, income) => sum + income.amount, 0);
      }
    },
    getIncome(id: number) {
      const index = this.months.findIndex(m => m.id === id);
      if (index !== -1) {
        return this.months[index].income
      }
    },
    deleteIncome(id: number, incomeId: number) {
      const index = this.months.findIndex(m => m.id === id);
      if (index !== -1) {
        this.months[index].income = this.months[index].income.filter(i => i.id !== incomeId);
        this.months[index].totalIncome = this.months[index].income.reduce((sum, income) => sum + income.amount, 0);
      }
    },
    newExpense(id: number, expense: transactionModel) {
      const index = this.months.findIndex(m => m.id === id);
      if (index !== -1) {
        this.months[index].expenses.push(expense);
        this.months[index].totalExpenses = this.months[index].expenses.reduce((sum, expense) => sum + expense.amount, 0);
      }
    },
    getExpenses(id: number) {
      const index = this.months.findIndex(m => m.id === id);
      if (index !== -1) {
        return this.months[index].expenses;
      }
    },
    deleteExpense(id: number, expenseId: number) {
      const index = this.months.findIndex(m => m.id === id);
      if (index !== -1) {
        this.months[index].expenses = this.months[index].expenses.filter(e => e.id !== expenseId);
        this.months[index].totalExpenses = this.months[index].expenses.reduce((sum, expense) => sum + expense.amount, 0);
      }
    },
    getYearlyBalance() {
      const totalIncome = this.months.reduce((sum, month) => sum + month.totalIncome, 0);
      const totalExpenses = this.months.reduce((sum, month) => sum + month.totalExpenses, 0);
      const transactionNumber = this.months.reduce((sum, month) => sum + month.income.length + month.expenses.length, 0);
      return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses, transactionNumber };
    },

    getYearlyChart(){
      const monthlyData = this.months.map(month => ({
        month: month.name,
        ingresos: month.totalIncome || 0,
        gastos: month.totalExpenses || 0}));
      return monthlyData;
    },    
  },
  persist: true
})
