document.addEventListener('DOMContentLoaded', function() {
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const budgetList = document.getElementById('budget-list');

    let budgets = {};

    budgetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (!budgets[category]) {
            budgets[category] = { budget: amount, expenses: 0 };
        }

        displayBudgets();
        budgetForm.reset();
    });

    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = document.getElementById('expense-category').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);

        if (budgets[category]) {
            budgets[category].expenses += amount;
            displayBudgets();
        } else {
            alert('Category does not exist. Please set a budget for this category first.');
        }

        expenseForm.reset();
    });

    function displayBudgets() {
        budgetList.innerHTML = '';
        for (const category in budgets) {
            const budget = budgets[category];
            const li = document.createElement('li');
            li.className = 'budget-item';
            let className = '';
            const spentPercentage = (budget.expenses / budget.budget) * 100;

            if (spentPercentage > 100) {
                className = 'exceeded';
            } else if (spentPercentage > 75) {
                className = 'warning';
            }

            li.className += ' ' + className;
            li.textContent = `${category}: Budgeted $${budget.budget.toFixed(2)}, Spent $${budget.expenses.toFixed(2)}`;
            budgetList.appendChild(li);
        }
    }
});
