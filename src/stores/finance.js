import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { watch } from 'vue'

export const useFinanceStore = defineStore('finance', () => {
	const STORAGE_KEY = 'finance_transactions'

	function loadFromStorage() {
		const saved = localStorage.getItem(STORAGE_KEY)
		if (saved) {
			return JSON.parse(saved)
		}
		return []
	}
	const transactions = ref(loadFromStorage())

	function addTransaction(transactionData) {
		const newTransaction = {
			id: Date.now(),
			amount: transactionData.amount,
			category: transactionData.category,
			date: transactionData.date
		}
		transactions.value.push(newTransaction)
	}

	function clearAllTransactions() {
		transactions.value = []
	}

	const getAllTransactions = computed(() => transactions.value)
	
	watch(
		transactions, 
		(newTransactions) => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions))
		},
		{deep: true}
	)
	

	return {
		clearAllTransactions,
		transactions,
		addTransaction,
		getAllTransactions
	}
})