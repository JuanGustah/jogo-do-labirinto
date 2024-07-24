export class Ambiente{
  mazeWidth;
  mazeHeight;
  mazeMap;
  maze;
  player;

  constructor() {
    this.mazeMap = [
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
    this.mazeHeight = 10;
    this.mazeWidth = 10;
    this.maze = document.getElementById('maze');
    this.player = document.createElement('div');
    this.player.className = 'player';
    this.maze.appendChild(this.player);
  }

  movePlayer(playerPosition, newY, newX){
    this.player.style.left = playerPosition.x * 40 + 'px';
    this.player.style.top = playerPosition.y * 40 + 'px';
    this.mazeMap[newY][newX] = 2;
  }
}