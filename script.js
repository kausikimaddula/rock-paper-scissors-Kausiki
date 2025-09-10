// Game state
let playerScore = 0;
let computerScore = 0;
let round = 1;

// DOM elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundEl = document.getElementById('round');
const resultEl = document.getElementById('result');
const playAgainBtn = document.getElementById('play-again');
const choices = document.querySelectorAll('.choice');

// Sound effects
const clickSound = new Audio('assets/click.mp3');
const winSound = new Audio('assets/win.mp3');
const loseSound = new Audio('assets/lose.mp3');
const drawSound = new Audio('assets/draw.mp3');

// Random computer choice
function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

// Determine winner
function getWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'player';
  return 'computer';
}

// Handle player choice
choices.forEach(button => {
  button.addEventListener('click', () => {
    if (round > 5) return;

    clickSound.play();

    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    if (winner === 'player') {
      playerScore++;
      resultEl.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
      resultEl.style.color = '#00ff88';
      winSound.play();
    } else if (winner === 'computer') {
      computerScore++;
      resultEl.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
      resultEl.style.color = '#ff4c4c';
      loseSound.play();
    } else {
      resultEl.textContent = `It's a draw! You both chose ${playerChoice}`;
      resultEl.style.color = '#cccccc';
      drawSound.play();
    }

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    roundEl.textContent = round;

    round++;

    if (round > 5) {
      showFinalResult();
    }
  });
});

// Final result
function showFinalResult() {
  if (playerScore > computerScore) {
    resultEl.textContent = '🎉 You won the game!';
    resultEl.style.color = '#00ff88';
    winSound.play();
  } else if (computerScore > playerScore) {
    resultEl.textContent = '😞 You lost the game!';
    resultEl.style.color = '#ff4c4c';
    loseSound.play();
  } else {
    resultEl.textContent = '🤝 It’s a tie!';
    resultEl.style.color = '#cccccc';
    drawSound.play();
  }
  playAgainBtn.classList.remove('hidden');
}

// Reset game
playAgainBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  roundEl.textContent = '1';
  resultEl.textContent = '';
  playAgainBtn.classList.add('hidden');
});