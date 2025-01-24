const workDuration = 25 * 60; //Cambiar para hacer las pruebas
const breakDuration = 5 * 60; //Cambiar para hacer las pruebas
let timer;
let isWorking = true;
let timeLeft = workDuration;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    statusDisplay.textContent = isWorking ? 'Tiempo de Trabajo' : 'Tiempo de Descanso';
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft < 0) {
                clearInterval(timer);
                timer = null;
                isWorking = !isWorking;
                timeLeft = isWorking ? workDuration : breakDuration;
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorking = true;
    timeLeft = workDuration;
    updateDisplay();
}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();