// stores/monthStore.ts
import { defineStore } from 'pinia'
import type { MonthModel } from '@/models/MonthModel'
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
    }
  },
  persist: true
})
