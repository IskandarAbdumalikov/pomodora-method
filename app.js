let timer;
let isWorking = true;
let cyclesCompleted = 0;
let totalCycles;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const workDurationInput = document.getElementById("workDuration");
const breakDurationInput = document.getElementById("breakDuration");
const cyclesInput = document.getElementById("cycles");

let workTime;
let breakTime;
let currentTime;

function updateDisplay() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  timerDisplay.textContent = `${
    minutes ? minutes.toString().padStart(2, "0") : 0
  }:${seconds ? seconds.toString().padStart(2, "0") : 0}`;
}

function startTimer() {
  clearInterval(timer); 
  workTime = workDurationInput.value * 60;
  breakTime = breakDurationInput.value * 60;
  totalCycles = cyclesInput.value;
  currentTime = workTime;

  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      if (isWorking) {
        cyclesCompleted++;
        if (cyclesCompleted >= totalCycles) {
          alert("All cycles completed!");
          resetTimer();
          return;
        }
      }
      isWorking = !isWorking;
      currentTime = isWorking ? workTime : breakTime;
      updateDisplay();
      startTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isWorking = true;
  cyclesCompleted = 0;
  currentTime = workDurationInput.value * 60;
  updateDisplay();
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();
