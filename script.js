document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const submitBtn = document.getElementById('submit-btn');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let editingExpenseIndex = null;

    const saveExpensesToLocalStorage = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.name}: $${expense.amount}</span>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    };

    const addExpense = (name, amount) => {
        expenses.push({ name, amount });
        saveExpensesToLocalStorage();
        renderExpenses();
    };

    const updateExpense = (index, name, amount) => {
        expenses[index] = { name, amount };
        saveExpensesToLocalStorage();
        renderExpenses();
    };

    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        saveExpensesToLocalStorage();
        renderExpenses();
    };

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = expenseAmountInput.value.trim();

        if (editingExpenseIndex !== null) {
            updateExpense(editingExpenseIndex, name, amount);
            submitBtn.textContent = 'Add Expense';
            editingExpenseIndex = null;
        } else {
            addExpense(name, amount);
        }

        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            deleteExpense(index);
        }

        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const expense = expenses[index];
            expenseNameInput.value = expense.name;
            expenseAmountInput.value = expense.amount;
            submitBtn.textContent = 'Update Expense';
            editingExpenseIndex = index;
        }
    });

    renderExpenses();
});


