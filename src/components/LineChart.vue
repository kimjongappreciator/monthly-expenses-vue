<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartCanvas = ref(null)
let chartInstance = null

const chartData = computed(() => store.getYearlyChart())

const createChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  const data = chartData.value

  chartInstance = new ChartJS(ctx, {
    type: 'line',
    data: {
      labels: data.map(item => item.month),
      datasets: [
        {
          label: 'Ingresos',
          data: data.map(item => item.ingresos),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
        },
        {
          label: 'Gastos',
          data: data.map(item => item.gastos),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          ticks: { color: '#374151' }
        },
        y: {
          display: true,
          ticks: {
            color: '#374151',
            callback: (value) => '$' + value.toLocaleString()
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(chartData, () => {
  createChart()
}, { deep: true })
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}
</style>