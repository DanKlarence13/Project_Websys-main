document.addEventListener('DOMContentLoaded', function() {
    const goalForm = document.getElementById('goal-form');
    const progressForm = document.getElementById('progress-form');
    const goalList = document.getElementById('goal-list');

    let goals = {};

    goalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('goal-name').value;
        const amount = parseFloat(document.getElementById('goal-amount').value);

        if (!goals[name]) {
            goals[name] = { goalAmount: amount, savedAmount: 0 };
        }

        displayGoals();
        goalForm.reset();
    });

    progressForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('progress-goal').value;
        const amount = parseFloat(document.getElementById('progress-amount').value);

        if (goals[name]) {
            goals[name].savedAmount += amount;
            displayGoals();
        } else {
            alert('Goal does not exist. Please set the goal first.');
        }

        progressForm.reset();
    });

    function displayGoals() {
        goalList.innerHTML = '';
        for (const name in goals) {
            const goal = goals[name];
            const li = document.createElement('li');
            li.className = 'goal-item';

            const progress = (goal.savedAmount / goal.goalAmount) * 100;
            let progressBar = `<div class="progress-bar" style="width: ${progress}%"></div>`;

            if (goal.savedAmount >= goal.goalAmount) {
                li.className += ' completed';
                progressBar = `<div class="progress-bar" style="width: 100%"></div>`;
            }

            li.innerHTML = `<strong>${name}</strong>: $${goal.savedAmount.toFixed(2)} of $${goal.goalAmount.toFixed(2)}
                            ${progressBar}`;
            goalList.appendChild(li);
        }
    }
});

