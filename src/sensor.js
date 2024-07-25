var playerDOM;
var mazeDOM;
export function readMaze() {
  let numCol = 20;
  let count = 0;
  let mazeRead = [];
  let startPos;
  let endPos;
  let playerPos;
  mazeDOM = document.getElementById("maze");

  playerDOM = document.getElementsByClassName("player")[0];

  playerDOM.remove();

  Array.from(mazeDOM.children).forEach((el) => {
    if (count == 0) {
      mazeRead.push([]);
    }

    count++;
    let classList = el.classList;
    let row = mazeRead.length;

    if (classList.contains("wall")) {
      mazeRead[row - 1].push(1);
    }
    if (classList.contains("start")) {
      let col = mazeRead[row - 1].length;

      startPos = { x: col, y: row - 1 };
      mazeRead[row - 1].push(0);
    }
    if (classList.contains("finish")) {
      let col = mazeRead[row - 1].length;

      endPos = { x: col, y: row - 1 };
      mazeRead[row - 1].push(0);
    }

    if (
      !classList.contains("wall") &&
      !classList.contains("finish") &&
      !classList.contains("start")
    ) {
      mazeRead[row - 1].push(0);
    }

    if (count == 20) {
      count = 0;
    }
    return;
  });

  mazeDOM.appendChild(playerDOM);

  let playerLeft = Number(playerDOM.style.left.replace("px", "")) / 40;
  let playerTop = Number(playerDOM.style.top.replace("px", "")) / 40;
  playerPos = { x: playerLeft, y: playerTop };

  return {
    maze: { mazeMap: mazeRead, startPos: startPos, endPos: endPos },
    playerPos,
  };
}
