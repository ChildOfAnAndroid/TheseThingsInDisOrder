// script.js
const timeRemainingElement = document.getElementById('time-remaining');
const progressBar = document.querySelector('.progress-bar');
const hexagonsContainer = document.querySelector('.hexagons');
const taskDetails = document.querySelector('.task-details');
let taskIndex = 0;
let progressBarInterval;

const tasks = [
    {
        name: 'Mindfulness (5-minute body scan)',
        time: 5
    },
    {
        name: 'Actimel and 1 pint of water',
        time: 10
    }
    // Add more tasks here
];

function displayHexagons() {
    hexagonsContainer.innerHTML = '';
    const progress = (taskIndex / tasks.length) * 100;
    const hexagonCount = Math.min(Math.floor((progress / 2)), 50);

    for (let i = 0; i < hexagonCount; i++) {
        const hexagon = document.createElement('div');
        hexagon.classList.add('hexagon');
        hexagonsContainer.appendChild(hexagon);

        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        hexagon.style.left = `${randomX}px`;
        hexagon.style.top = `${randomY}px`;
    }
}

function updateTimer(time) {
    timeRemainingElement.textContent = `${time} minutes`;

    if (taskIndex < tasks.length) {
        const progress = ((tasks[taskIndex].time - time) / tasks[taskIndex].time) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

function startTask() {
    if (taskIndex < tasks.length) {
        const task = tasks[taskIndex];
        const totalTime = task.time * 60 * 1000;
        let elapsed = 0;

        updateTimer(task.time);
        taskDetails.innerHTML = `<p class="task-name">${task.name}</p>`;

        clearInterval(progressBarInterval);

        progressBarInterval = setInterval(() => {
            elapsed += 1000;
            progressBar.style.width = `${(elapsed / totalTime) * 100}%`;

            if (elapsed >= totalTime) {
                clearInterval(progressBarInterval);
                taskIndex++;
                displayHexagons();
                startTask();
            }
        }, 1000);
    } else {
        timeRemainingElement.textContent = 'No tasks remaining.';
    }
}

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', startTask);
