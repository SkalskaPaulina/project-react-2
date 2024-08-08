import React from 'react';
import {Header} from './component/Header';
import {Entry} from './entity/Entry';
import {Section} from './component/Section';

export function App(): React.ReactElement {
	const [incomes, setIncomes] = React.useState<Entry[]>([]);
	const [expenses, setExpenses] = React.useState<Entry[]>([]);
	const [incomeId, setIncomeId] = React.useState<number>(0);
	const [expenseId, setExpenseId] = React.useState<number>(0);

	function calculateBalance(): number {
		const incomeSum = incomes
			.map(entry => entry.amount)
			.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		const expenseSum = expenses
			.map(entry => entry.amount)
			.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		return incomeSum - expenseSum;
	}

	function handleAddIncome(entry: Entry): void {
		setIncomes([...incomes, {
			...entry,
			id: incomeId
		}]);
		setIncomeId((prev: number): number => prev + 1)
	}

	function handleAddExpense(entry: Entry): void {
		setExpenses([...expenses, {
			...entry,
			id: expenseId
		}]);
		setExpenseId((prev: number): number => prev + 1)
	}

	function handleRemoveIncome(entry: Entry): void {
		setIncomes(incomes.filter(element => element !== entry));
	}

	function handleRemoveExpense(entry: Entry): void {
		setExpenses(expenses.filter(element => element !== entry));
	}

	function handleEditIncome(entry: Entry): void {
		const index = incomes.findIndex((e: Entry): boolean => e.id === entry.id);
		incomes[index] = entry;
		setIncomes([...incomes]);
	}

	function handleEditExpense(entry: Entry): void {
		const index = incomes.findIndex((e: Entry): boolean => e.id === entry.id);
		expenses[index] = entry;
		setExpenses([...expenses]);
	}

	return <div className='container text-center'>
		<Header
			balance={calculateBalance()}
		/>
		<main className='row'>
			<Section
				title='PRZYCHODY'
				entries={incomes}
				onAdd={handleAddIncome}
				onRemove={handleRemoveIncome}
				onEdit={handleEditIncome}
			/>
			<Section
				title='WYDATKI'
				entries={expenses}
				onAdd={handleAddExpense}
				onRemove={handleRemoveExpense}
				onEdit={handleEditExpense}
			/>
		</main>
	</div>;
}
