function movePlayer() {
  player.style.left = playerPosition.x * 40 + "px";
  player.style.top = playerPosition.y * 40 + "px";
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

const mazeWidth = 20; // largura do labirinto em células
const mazeHeight = 20; // altura do labirinto em células

const maze = document.getElementById("maze");

const mazeMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const startPosition = { x: 1, y: 1 }; // posição inicial do labirinto
//variar o 15 e 16 no y
const finishPosition = { x: 6, y: 16 }; // posição final do labirinto

let playerPosition = { x: 1, y: 1 }; // posição inicial do jogador
const player = document.createElement("div");
player.className = "player";
movePlayer();

maze.appendChild(player);

document.addEventListener("keydown", function (event) {
  const key = event.key;

  let newX = playerPosition.x;
  let newY = playerPosition.y;

  if (key === "ArrowUp") {
    newY--;
  } else if (key === "ArrowDown") {
    newY++;
  } else if (key === "ArrowLeft") {
    newX--;
  } else if (key === "ArrowRight") {
    newX++;
  }

  // Verifica se a nova posição é válida (não colide com paredes)
  if (mazeMap[newY][newX] === 0) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    movePlayer();
  }

  // Verifica se o jogador chegou ao final
  if (
    playerPosition.x === finishPosition.x &&
    playerPosition.y === finishPosition.y
  ) {
    setTimeout(function () {
      alert("Parabéns! Você completou a primeira fase do labirinto!");
    }, 100);
  }
});

const timerElement = document.getElementById("timer");
let startTime = Date.now();

setInterval(updateTimer, 1000); // Atualiza o temporizador a cada segundo
//console.log(mazeMap);
for (let y = 0; y < mazeHeight; y++) {
  for (let x = 0; x < mazeWidth; x++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (mazeMap[y][x] === 1) {
      cell.classList.add("wall");
    }
    if (x === finishPosition.x && y === finishPosition.y) {
      cell.classList.add("finish");
    }
    if (x === startPosition.x && y === startPosition.y) {
      cell.classList.add("start");
    }
    maze.appendChild(cell);
  }
}
