<script setup>
import { useFinanceStore } from '@/stores/finance'

const store = useFinanceStore()

// Словарь категорий для отображения (такой же, как везде)
const CATEGORY_LABELS = {
  food: '🍔 Еда',
  transport: '🚗 Транспорт',
  funny: '🎉 Развлечения',
  health: '💪 Здоровье/спорт',
  other: '📌 Другое'
}

// Форматирование даты из YYYY-MM-DD в DD.MM.YYYY
const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${day}.${month}.${year}`
}
</script>

<template>
  <div class="transaction-list">
    <h2>📋 История расходов</h2>
    <div v-if="store.transactions.length === 0" class="empty-state">
      Пока нет расходов. Добавьте первый!
    </div>
    <div v-else class="list">
      <div v-for="tx in store.transactions" :key="tx.id" class="transaction-item">
        <div class="transaction-info">
          <span class="category">{{ CATEGORY_LABELS[tx.category] }}</span>
          <span class="date">{{ formatDate(tx.date) }}</span>
        </div>
        <div class="amount">{{ tx.amount }} ₽</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction-list {
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1a1a2e;
}

.empty-state {
  text-align: center;
  color: #718096;
  padding: 2rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f7fafc;
  border-radius: 16px;
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.category {
  font-weight: 600;
  color: #2d3748;
}

.date {
  font-size: 0.8rem;
  color: #718096;
}

.amount {
  font-weight: 700;
  font-size: 1.2rem;
  color: #e53e3e;
}
</style>