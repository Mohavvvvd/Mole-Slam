const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.createElement('div');
scoreDisplay.classList.add('score');
document.body.appendChild(scoreDisplay);
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn'); 
const gameOverSound = document.getElementById('gameOverSound'); 

let score = 0;
let lastHole;
let timeLeft = 60;
let timeUp = false;
let gameRunning = false; 
let timerInterval; 

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    if (!timeUp && gameRunning) { 
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add('mole');
        setTimeout(() => {
            hole.classList.remove('mole');
            peep(); 
        }, time);
    }
}

function startGame() {
    if (!gameRunning) { 
        gameRunning = true;
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        timeUp = false;
        timeLeft = 60;
        timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
            } else {
                clearInterval(timerInterval);
                timeUp = true;
                alert('Time\'s up! Your final score: ' + score);
                gameRunning = false; 
                gameOverSound.play(); 
            }
        }, 1000); 
        peep();
    }
}

function restartGame() {
    clearInterval(timerInterval); 
    timeUp = false;
    timeLeft = 60;
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
    gameRunning = false;
    gameOverSound.pause(); 
    gameOverSound.currentTime = 0; 
}

function bonk(e) {
    if (!e.isTrusted || !this.classList.contains('mole')) return; 
    score++;
    this.classList.remove('mole');
    scoreDisplay.textContent = `Score: ${score}`;
}

holes.forEach(hole => hole.addEventListener('click', bonk));
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame); 