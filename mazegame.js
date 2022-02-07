import { myMaze as thismaze } from "./call_maze.js";

let complete = document.querySelector(".complete");
let message = document.querySelector("#complete-message");
let gameFinished = false;
let countMove = 0;

document.addEventListener("keydown", move);
let replay = document.querySelector(".replay");
let maze_container = document.querySelector(".maze");
// replay.addEventListener("click", () => location.reload() );

// Play Again
replay.addEventListener("click", () => {
  complete.style.display = "none";
  maze_container.style.visibility = "hidden";
  gameFinished = false;
  countMove = 0;
});

export function move(e) {
  if (!thismaze.isComplete) return;
  if (gameFinished) return;
  let key = e.key;
  let y = thismaze.currentCell.y;
  let x = thismaze.currentCell.x;

  const DX = { 'right' : 1, 'left' : -1, 'top' : 0, 'bottom' : 0 };
  const DY = { 'right' : 0, 'left' : 0, 'top' : -1, 'bottom' : 1 };
  const dir = { 'ArrowUp' : 'top', 'ArrowRight' : 'right', 'ArrowDown' : 'bottom', 'ArrowLeft' : 'left' };

  if (! Object.keys(dir).includes(key)) return;

  if (!thismaze.currentCell.walls[dir[key]]) {
    let nextCell = thismaze.grid[y + DY[dir[key]]][x + DX[dir[key]]];
    thismaze.drawCell(thismaze.currentCell);
    thismaze.currentCell = nextCell;
    thismaze.drawImage(thismaze.currentCell, 'boy');
    countMove++;
    if (thismaze.currentCell === thismaze.goal) {
      complete.style.display = "block";
      gameFinished = true;
      message.innerHTML = `You Moved ${countMove} Steps.`;
    }
  }
}

// export { move };