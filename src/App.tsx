import React from 'react';
import {Header} from './component/Header';
import {Entry} from './entity/Entry';
import {Section} from './component/Section';

function App() {
	const [incomes, setIncomes] = React.useState<Entry[]>([]);
	const [expenses, setExpenses] = React.useState<Entry[]>([]);

	function calculateBalance(): number {
		const incomeSum = incomes.map(entry => entry.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		const expenseSum = expenses.map(entry => entry.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return incomeSum - expenseSum;
	}

	function handleAddIncome(entry: Entry): void {
		setIncomes([...incomes, entry]);
	}

	function handleAddExpense(entry: Entry): void {
		setExpenses([...expenses, entry]);
	}

	function handleRemoveIncome(entry: Entry): void {
		setIncomes(incomes.filter(element => element !== entry));
	}

	function handleRemoveExpense(entry: Entry): void {
		setExpenses(expenses.filter(element => element !== entry));
	}

	function handleEditIncome(index: number, entry: Entry): void {
		incomes[index] = entry;
		setIncomes([...incomes]);
	}

	function handleEditExpense(index: number, entry: Entry): void {
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

export default App;
