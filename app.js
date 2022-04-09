const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const gameOver = document.querySelector(".gameOver");

let result = 0;
let hitPosition;
function startRandom() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", function () {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

let timerId = null;
function moveMole() {
  timerId = setInterval(startRandom, 500);
}

function countDown() {
  let asd = setInterval(() => {
    if (+timeLeft.textContent === 0) {
      clearInterval(timerId);
      gameOver.innerHTML = `
      <p>Game Over</p>
      <p class="score">Your score is ${result}</p>
      <button class="btn">Try Again</button>`;
      gameOver.classList.add("show");
      gameOver.querySelector(".btn").addEventListener("click", function () {
        squares.forEach((square) => {
          square.classList.remove("mole");
        });
        score.textContent = 0;
        timeLeft.textContent = 60;
        gameOver.classList.remove("show");
        result = 0;
        countDown();
        moveMole();
      });

      clearInterval(asd);

      return;
    }
    +timeLeft.textContent--;
  }, 1000);
}
countDown();

moveMole();
