import { Agente } from "./Agente";

document.addEventListener('DOMContentLoaded', function() {
  const mazeWidth = 10; // largura do labirinto em células
  const mazeHeight = 10; // altura do labirinto em células

  const maze = document.getElementById('maze');
  
  

  // Definição do labirinto (exemplo simples)
  const mazeMap = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
      [1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const startPosition = { x: 1, y: 1 }; // posição inicial do labirinto

  const finishPosition = { x: 8, y: 1 }; // posição final do labirinto
  
  //estado 
  class Estado {
      constructor(posP, posWin, status){
          this.player = posP;
          this.posWin = posWin;
          this.status = status;
      }
  }

  const estado = new Estado(startPosition, finishPosition, '' );

  let playerPosition = { x: 1, y: 1 }; // posição inicial do jogador
  const player = document.createElement('div');
  player.className = 'player';
  movePlayer(1, 1);

  //let enemyPosition = { x: -1000, y: 12 }; // posição inicial do inimigo
  //const enemy = document.createElement('div');
  //enemy.className = 'enemy';
  //moveEnemy();

  //let lastEnemyPosition = { x: enemyPosition.x, y: enemyPosition.y };

  let isPaused = false; // estado de pausa do jogo

  maze.appendChild(player);
  //maze.appendChild(enemy);

  // Criação do labirinto visualmente
  for (let y = 0; y < mazeHeight; y++) {
      for (let x = 0; x < mazeWidth; x++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          if (mazeMap[y][x] === 1) {
              cell.classList.add('wall');
          }
          if (x === finishPosition.x && y === finishPosition.y) {
              cell.classList.add('finish');
          }
          if (x === startPosition.x && y === startPosition.y) {
              cell.classList.add('start');
          }
          maze.appendChild(cell);
      }
  }

  function movePlayer(newY, newX) {
      player.style.left = playerPosition.x * 40 + 'px';
      player.style.top = playerPosition.y * 40 + 'px';
      mazeMap[newY][newX] = 2;
      //console.log(mazeMap)
  }

  /*function moveEnemy() {
      enemy.style.left = enemyPosition.x * 40 + 'px';
      enemy.style.top = enemyPosition.y * 40 + 'px';
  }*/

  /*function moveEnemyTowardsPlayer() {
      if (isPaused) return; // não move o inimigo se o jogo estiver pausado

      const directions = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 }
      ];

      let bestMove = null;
      let minDistance = Infinity;

      for (const direction of directions) {
          const newX = enemyPosition.x + direction.dx;
          const newY = enemyPosition.y + direction.dy;

          if (mazeMap[newY][newX] === 0 && !(newX === lastEnemyPosition.x && newY === lastEnemyPosition.y)) {
              const distance = Math.abs(playerPosition.x - newX) + Math.abs(playerPosition.y - newY);
              if (distance < minDistance) {
                  minDistance = distance;
                  bestMove = { x: newX, y: newY };
              }
          }
      }

      if (bestMove) {
          lastEnemyPosition = { ...enemyPosition };
          enemyPosition = bestMove;
      }

      moveEnemy();

      // Verifica se o inimigo alcançou o jogador
      if (enemyPosition.x === playerPosition.x && enemyPosition.y === playerPosition.y) {
          alert('Game Over! O inimigo te pegou.');
          window.location.href = 'game-over.html';
      }
  }*/

  document.addEventListener('keydown', function(event) {
      //agente_de_resolucao_problema_simples(estado);
      
      const key = event.key;

      if (key === 'Escape' || key === 'escape') {
        
          isPaused = !isPaused; // alterna o estado de pausa
          return;
      }

      if (isPaused) return; // não move o jogador se o jogo estiver pausado

      let newX = playerPosition.x;
      let newY = playerPosition.y;
      //retira do local anterior
      mazeMap[newY][newX] = 0;

      if (key === 'ArrowUp') {
          newY--;
      } else if (key === 'ArrowDown') {
          newY++;
      } else if (key === 'ArrowLeft') {
          newX--;
      } else if (key === 'ArrowRight') {
          newX++;
      }

      // Verifica se a nova posição é válida (não colide com paredes)
      if (mazeMap[newY][newX] === 0) {
          playerPosition.x = newX;
          playerPosition.y = newY;
          movePlayer(newY, newX);
      }

      // Verifica se o jogador chegou ao final
      if (playerPosition.x === finishPosition.x && playerPosition.y === finishPosition.y) {
          setTimeout(function() {
              alert('Parabéns! Você completou a primeira fase do labirinto!');
              // Aqui você pode redirecionar para a próxima fase
              window.location.href = 'labirinto-fase-2.html'; // Substitua pelo nome do próximo arquivo HTML
          }, 100);
      }        
  });

  // Move o inimigo a cada 250ms
  //setInterval(moveEnemyTowardsPlayer, 1);

  // Temporizador
  const timerElement = document.getElementById('timer');
  let startTime = Date.now();

  function updateTimer() {
      if (isPaused) return; // não atualiza o temporizador se o jogo estiver pausado
      const elapsedTime = Date.now() - startTime;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  setInterval(updateTimer, 1000); // Atualiza o temporizador a cada segundo
});



