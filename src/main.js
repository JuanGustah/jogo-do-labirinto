//import { Estado } from "./Estado";
import { Ambiente } from "./Ambiente";
import { Player } from "./Player";
import { Timer } from "./Timer";

const ambiente = new Ambiente();
const player = new Player();
//const estado = new Estado(startPosition, finishPosition, '');
ambiente.movePlayer(player.playerPosition, 1, 1);
new Timer();

// Criação do labirinto visualmente
for (let y = 0; y < ambiente.mazeHeight; y++) {
    for (let x = 0; x < ambiente.mazeWidth; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (ambiente.mazeMap[y][x] === 1) {
            cell.classList.add('wall');
        }
        if (x === player.finishPosition.x && y === player.finishPosition.y) {
            cell.classList.add('finish');
        }
        if (x === startPosition.x && y === startPosition.y) {
            cell.classList.add('start');
        }
        ambiente.maze.appendChild(cell);
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    let newX = player.playerPosition.x;
    let newY = player.playerPosition.y;
    //retira do local anterior
    ambiente.mazeMap[newY][newX] = 0;

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
    if (ambiente.mazeMap[newY][newX] === 0) {
        player.playerPosition.x = newX;
        player.playerPosition.y = newY;
        ambiente.movePlayer(player.playerPosition, newY, newX);
    }

    // Verifica se o jogador chegou ao final
    if (player.playerPosition.x === player.finishPosition.x && player.playerPosition.y === player.finishPosition.y) {
        setTimeout(function () {
            alert('Parabéns! Você completou a primeira fase do labirinto!');
            // Aqui você pode redirecionar para a próxima fase
            window.location.href = 'labirinto-fase-2.html'; // Substitua pelo nome do próximo arquivo HTML
        }, 100);
    }
});




