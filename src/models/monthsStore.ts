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
      const index = this.months.findIndex(m => m.id === id)
      if (index !== -1) {
        this.months[index] = { ...this.months[index], ...data }
      }
    },
    newIncome(id: number, income: transactionModel) {
      const index = this.months.findIndex(m => m.id === id)
      if (index !== -1) {
        this.months[index].income.push(income)        
      }
    },
    getIncome(id: number) {
      const index = this.months.findIndex(m => m.id === id)
      if (index !== -1) {
        return this.months[index].income
      }
    },
    deleteIncome(id: number, incomeId: number) {
      const index = this.months.findIndex(m => m.id === id)
      if (index !== -1) {
        this.months[index].income = this.months[index].income.filter(i => i.id !== incomeId)
      }
    },
    newExpense(id: number, expense: transactionModel) {
      const index = this.months.findIndex(m => m.id === id)
      if (index !== -1) {
        this.months[index].expenses.push(expense)
      }
    },
    getExpenses(id: number) {
      const index = this.months.findIndex(m => m.id === id)
      if (index !== -1) {
        return this.months[index].expenses
      }
    },
    deleteExpense(id: number, expenseId: number) {
      const index = this.months.findIndex(m => m.id === id)
      if (index !== -1) {
        this.months[index].expenses = this.months[index].expenses.filter(e => e.id !== expenseId)        
      }
    }

  },
  persist: true
})
