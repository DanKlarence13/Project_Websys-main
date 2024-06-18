document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const generateReportButton = document.getElementById('generate-report');
    const ctx = document.getElementById('expense-chart').getContext('2d');
    let expenses = [];

    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (date && category && amount) {
            expenses.push({ date, category, amount });
            alert('Expense added successfully!');
        } else {
            alert('Please fill out all fields.');
        }

        expenseForm.reset();
    });

    generateReportButton.addEventListener('click', function() {
        if (expenses.length > 0) {
            const categorizedExpenses = categorizeExpenses(expenses);
            const monthlyExpenses = calculateMonthlyExpenses(expenses);
            displayChart(ctx, categorizedExpenses, monthlyExpenses);
        } else {
            alert('No expenses to generate report.');
        }
    });

    function categorizeExpenses(expenses) {
        const categories = {};
        expenses.forEach(expense => {
            if (!categories[expense.category]) {
                categories[expense.category] = 0;
            }
            categories[expense.category] += expense.amount;
        });
        return categories;
    }

    function calculateMonthlyExpenses(expenses) {
        const monthly = {};
        expenses.forEach(expense => {
            const month = expense.date.slice(0, 7); // YYYY-MM
            if (!monthly[month]) {
                monthly[month] = 0;
            }
            monthly[month] += expense.amount;
        });
        return monthly;
    }

    function displayChart(ctx, categorizedExpenses, monthlyExpenses) {
        const categories = Object.keys(categorizedExpenses);
        const categoryData = Object.values(categorizedExpenses);

        const months = Object.keys(monthlyExpenses);
        const monthData = Object.values(monthlyExpenses);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Expenses by Category',
                    data: categoryData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Monthly Expenses',
                    data: monthData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    type: 'line'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});