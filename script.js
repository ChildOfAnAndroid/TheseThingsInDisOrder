// script.js
const timeRemainingElement = document.getElementById('time-remaining');
const progressBar = document.querySelector('.progress-bar');
const taskDetails = document.querySelector('.task-details');
let taskIndex = 0;

const tasks = [
    {
        name: 'Mindfulness (5-minute body scan)',
        time: 5
    },
    {
        name: 'Actimel and 1 pint of water',
        time: 10
    },
    // Add more tasks here
];

function updateTimer(time) {
    timeRemainingElement.textContent = `${time} minutes`;

    // Check if there are still tasks remaining
    if (taskIndex < tasks.length) {
        const progress = ((tasks[taskIndex].time - time) / tasks[taskIndex].time) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

function startTask() {
    if (taskIndex < tasks.length) {
        const task = tasks[taskIndex];
        updateTimer(task.time);
        taskDetails.innerHTML = `<p class="task-name">${task.name}</p>`;
        
        // Update the progress bar width based on the task time
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = '100%'; // Reset the progress bar
        const totalTime = task.time * 60 * 1000; // Convert minutes to milliseconds
        let elapsed = 0;
        
        const progressBarInterval = setInterval(() => {
            elapsed += 1000; // Update every second
            progressBar.style.width = `${(elapsed / totalTime) * 100}%`;
            
            if (elapsed >= totalTime) {
                clearInterval(progressBarInterval);
            }
        }, 1000);

        taskIndex++;
    } else {
        timeRemainingElement.textContent = 'No tasks remaining.';
    }
}

document.querySelector('.start-button').addEventListener('click', startTask);
