<script setup>
import {ref} from 'vue'
import {useFinanceStore} from '@/stores/finance'
import ExpensesChart from '@/components/ExpensesChart.vue'
import TransactionList from '@/components/TransactionList.vue'
const store = useFinanceStore()
//store. addTransaction({amount: 500, category: 'food', date: '2026-04-10'})
//Число, которые берется за начальное значение в поле "Сумма"
const sum = ref(0)

// Строка, которая берется как начальное значение в поле "Категория"
const categories = ref('food')

// Строка с сегодняшней датой в формате YYYY-MM-DD
const date = ref(date.now())
const handleAddExpense = () => {
const newTransaction = {
	amount: sum.value,
	category: categories.value,
	date: date.value
}
store.addTransaction(newTransaction)
console.log(newTransaction)
sum.value = 0 // очищаем поле суммы после добавления

console.log(store.getAllTransactions)
}

const deleteAllExpense = () =>{
	store.clearAllTransactions()
}


</script>

<template>
	<div class = 'container'>
		<form @submit.prevent = "handleAddExpense">
			<h2 class="form-title">Добавить расход</h2>
			
			<div class="form-group">
				<label for="sum">Сумма (руб.)</label>
				<input 
					id="sum"
					name="sum" 
					type="number" 
					v-model="sum" 
					placeholder="0" 
					min="0" 
					step="1" 
					required>
			</div>

			<div class="form-group">
				<label for="categories">Категория</label>
				<select id="categories" v-model="categories" name="categories">
					<option value="food">🍔 Еда</option>
					<option value="transport">🚗 Транспорт</option>
					<option value="funny">🎉 Развлечения</option>
					<option value="health">💪 Здоровье/спорт</option>
					<option value="other">📌 Другое</option>
				</select>
			</div>

			<div class="form-group">
				<label for="date">Дата</label>
				<input id="date" type="date" v-model="date" required>
			</div>

			<button type="submit" class="submit-btn">➕ Добавить расход</button>
		</form>
		<button @click="deleteAllExpense" class="clear-btn">🗑️ Очистить все расходы</button>
		<ExpensesChart />
		<TransactionList/>
	</div>
</template>

<style scoped>
/* Общие стили и сброс */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 800px; /* чуть уже для лучшей читаемости */
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem; /* отступы между блоками */
  font-family: 'Segoe UI', 'Roboto', system-ui, -apple-system, sans-serif;
}

/* Карточка формы */
form {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 32px;
  padding: 2rem 2rem 2.5rem;
  width: 100%;
  box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

form:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.25);
}

/* Заголовок формы */
.form-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.8rem;
  text-align: center;
  color: #1a1a2e;
  letter-spacing: -0.3px;
  position: relative;
}

.form-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  margin: 10px auto 0;
}

/* Группы полей */
.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
}

/* Поля ввода и select */
input,
select {
  width: 100%;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background: white;
  transition: all 0.25s ease;
  font-family: inherit;
  color: #1a202c;
}

input:focus,
select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

input:hover,
select:hover {
  border-color: #cbd5e0;
}

/* Убираем стрелки для number input */
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Стили для date input */
input[type='date'] {
  position: relative;
  color-scheme: light;
}

/* Кнопка отправки */
.submit-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 18px rgba(102, 126, 234, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%);
}

.submit-btn:active {
  transform: translateY(1px);
}

/* Кнопка очистки */
.clear-btn {
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 18px rgba(245, 101, 101, 0.3);
}

.clear-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(245, 101, 101, 0.4);
}

/* График и список — обёртки */
.chart-container,
.transaction-list {
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 640px) {
  .container {
    padding: 1rem;
    gap: 1.5rem;
  }

  form {
    padding: 1.5rem 1.25rem 2rem;
    border-radius: 28px;
  }

  .form-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  input,
  select {
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
  }

  .submit-btn {
    padding: 0.85rem;
    font-size: 1rem;
  }

  .clear-btn {
    padding: 0.8rem;
    font-size: 0.95rem;
  }

  .chart-container,
  .transaction-list {
    padding: 1rem;
  }
}

/* Дополнительные улучшения */
input::placeholder {
  color: #a0aec0;
  font-weight: 400;
}

/* Кастомная стрелка для select */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2em;
  padding-right: 2.5rem;
}

option {
  padding: 10px;
  font-weight: normal;
}

.submit-btn:focus-visible,
.clear-btn:focus-visible {
  outline: 3px solid #a0aec0;
  outline-offset: 2px;
}
</style>