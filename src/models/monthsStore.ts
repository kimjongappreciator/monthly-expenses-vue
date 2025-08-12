// stores/monthStore.ts
import { defineStore } from 'pinia'
import type { ExpenseModel, IncomeModel, MonthModel } from '@/models/MonthModel'
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
    newIncome(id: number, income: IncomeModel) {
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
    newExpense(id: number, expense: ExpenseModel) {
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
    }

  },
  persist: true
})
