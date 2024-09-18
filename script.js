// script.js
let totalTimerInterval;
let breatheTimerInterval;
let countdownInterval;
let totalTime = 60000; // 1分間（ミリ秒）
let currentBreatheTime = 4000; // 吸う時間: 4秒（ミリ秒）
let isBreathingIn = true;
let isRunning = false;

function updateTotalTimer() {
  const minutes = Math.floor(totalTime / 60000);
  const seconds = Math.floor((totalTime % 60000) / 1000);
  const milliseconds = Math.floor((totalTime % 1000) / 100);
  document.getElementById("totalTimer").innerText = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}.${milliseconds}`;
}

function updateBreatheTimer() {
  const seconds = Math.floor(currentBreatheTime / 1000);
  const milliseconds = Math.floor((currentBreatheTime % 1000) / 100);
  document.getElementById(
    "breatheTimer"
  ).innerText = `${seconds}.${milliseconds}`;
}

function startCountdown() {
  if (isRunning) return;
  let countdown = 3;
  document.getElementById("breathe").innerText = countdown;
  countdownInterval = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("breathe").innerText = "スタート！";
      setTimeout(() => {
        document.getElementById("breathe").innerText = "";
        startBreathing();
      }, 1000);
    } else {
      document.getElementById("breathe").innerText = countdown;
    }
  }, 1000);
}

function startBreathing() {
  if (isRunning) return;
  isRunning = true;

  totalTime = 60000;
  currentBreatheTime = 4000;
  isBreathingIn = true;
  document.getElementById("breathe").classList.remove("exhale");
  document.getElementById("breathe").classList.add("inhale");
  document.getElementById("breathe").innerText = "吸ってください";

  updateTotalTimer();
  updateBreatheTimer();

  totalTimerInterval = setInterval(() => {
    totalTime -= 100;
    if (totalTime <= 0) {
      totalTime = 0;
      stopBreathing();
      document.getElementById("totalTimer").innerText = "00:00.0";
      document.getElementById("breatheTimer").innerText = "0.0";
      document.getElementById("breathe").innerText = "おつかれさまでした！";
      return;
    }
    updateTotalTimer();
  }, 100);

  breatheTimerInterval = setInterval(() => {
    currentBreatheTime -= 100;
    if (currentBreatheTime <= 0) {
      toggleBreathing();
    }
    updateBreatheTimer();
  }, 100);
}

function stopBreathing() {
  clearInterval(totalTimerInterval);
  clearInterval(breatheTimerInterval);
  clearInterval(countdownInterval);
  isRunning = false;
}

function resetBreathing() {
  stopBreathing();
  totalTime = 60000;
  currentBreatheTime = 4000;
  isBreathingIn = true;
  document.getElementById("totalTimer").innerText = "01:00.0";
  document.getElementById("breatheTimer").innerText = "4.0";
  document.getElementById("breathe").innerText = "準備できましたか？";
  document.getElementById("breathe").classList.remove("exhale");
  document.getElementById("breathe").classList.add("inhale");
}

function toggleBreathing() {
  if (isBreathingIn) {
    document.getElementById("breathe").innerText = "吐いてください";
    document.getElementById("breathe").classList.remove("inhale");
    document.getElementById("breathe").classList.add("exhale");
    currentBreatheTime = 8000; // 吐く時間: 8秒（ミリ秒）
  } else {
    document.getElementById("breathe").innerText = "吸ってください";
    document.getElementById("breathe").classList.remove("exhale");
    document.getElementById("breathe").classList.add("inhale");
    currentBreatheTime = 4000; // 吸う時間: 4秒（ミリ秒）
  }
  isBreathingIn = !isBreathingIn;
  updateBreatheTimer();
}
