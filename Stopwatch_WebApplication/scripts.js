let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');
const lapReasonInput = document.getElementById('lapReason');

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

function startStopwatch() {
    isRunning = true;
    interval = setInterval(updateStopwatch, 10);
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.style.backgroundColor = '#ffc107'; // Change button color to Yellow
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(interval);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.style.backgroundColor = '#28a745'; // Change button color to Green
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsList.innerHTML = '';  // Clear lap times
    lapReasonInput.value = ''; // Clear lap reason input
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.style.backgroundColor = '#28a745'; // Reset start button color
}

function updateStopwatch() {
    milliseconds += 10;

    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

function updateDisplay() {
    hoursElement.textContent = hours < 10 ? '0' + hours : hours;
    minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
    millisecondsElement.textContent = milliseconds < 100 ? '0' + milliseconds / 10 : milliseconds / 10;
}

function recordLap() {
    const lapTime = `${hoursElement.textContent}:${minutesElement.textContent}:${secondsElement.textContent}:${millisecondsElement.textContent}`;
    const reason = lapReasonInput.value.trim() || 'No reason provided'; // Default reason if input is empty
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime} - ${reason}`;
    lapsList.appendChild(li);
    lapReasonInput.value = ''; // Clear the input field after recording
}

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
