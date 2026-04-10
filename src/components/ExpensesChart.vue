<script setup>
// 1. Импортируем необходимое из Vue и Pinia
import { computed } from 'vue'
import { useFinanceStore } from '@/stores/finance'

// 2. Импортируем компонент Bar из vue-chartjs
import { Bar } from 'vue-chartjs'

// 3. Импортируем и регистрируем нужные части Chart.js
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Регистрируем компоненты
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 4. Получаем доступ к нашему хранилищу
const store = useFinanceStore()

// 5. Словарь для отображения категорий (такой же, как в форме)
const CATEGORY_LABELS = {
  food: '🍔 Еда',
  transport: '🚗 Транспорт',
  funny: '🎉 Развлечения',
  health: '💪 Здоровье/спорт',
  other: '📌 Другое'
}

// 6. Вычисляемое свойство для данных графика
const chartData = computed(() => {
  // Получаем все транзакции из хранилища
  const transactions = store.transactions

  // Инициализируем суммы по категориям нулями
  const totals = {
    food: 0,
    transport: 0,
    funny: 0,
    health: 0,
    other: 0
  }

  // Суммируем amount по каждой категории
  transactions.forEach(t => {
    if (totals.hasOwnProperty(t.category)) {
      totals[t.category] += t.amount
    } else {
      // На случай, если появится неизвестная категория
      totals.other += t.amount
    }
  })

  // Формируем массив меток (labels) и данных (data) в одинаковом порядке
  const labels = []
  const data = []

  // Проходим по всем категориям в нужном нам порядке
  const categoryOrder = ['food', 'transport', 'funny', 'health', 'other']
  categoryOrder.forEach(cat => {
    // Можно показывать только те категории, где сумма > 0
    // Но для наглядности оставим все, даже с нулями
    labels.push(CATEGORY_LABELS[cat])
    data.push(totals[cat])
  })

  // Возвращаем объект в формате, который ждёт vue-chartjs
  return {
    labels: labels,
    datasets: [
      {
        label: 'Сумма расходов (₽)',
        data: data,
        backgroundColor: 'rgba(102, 126, 234, 0.7)', // полупрозрачный фиолетовый
        borderColor: 'rgb(102, 126, 234)',
        borderWidth: 1,
        borderRadius: 8, // скруглённые столбцы (работает с Chart.js v3+)
      }
    ]
  }
})

// 7. Настройки внешнего вида графика
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // чтобы управлять высотой через CSS
  plugins: {
    legend: {
      display: false, // скрываем легенду, т.к. у нас одна серия данных
    },
    title: {
      display: true,
      text: 'Расходы по категориям',
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: {
        bottom: 20
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          let value = context.raw || 0
          return `${value} ₽`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `${value} ₽`
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 350px;
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}
</style>