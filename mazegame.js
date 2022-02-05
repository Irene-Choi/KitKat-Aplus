import { myMaze as newMaze } from "./call_maze.js";

let complete = document.querySelector(".complete");

function move(e) {
  if (!newMaze.isComplete) return;
  let key = e.key;
  let y = newMaze.currentCell.y;
  let x = newMaze.currentCell.x;

  const DX = { 'right' : 1, 'left' : -1, 'top' : 0, 'bottom' : 0 };
  const DY = { 'right' : 0, 'left' : 0, 'top' : -1, 'bottom' : 1 };
  const dir = { 'ArrowUp' : 'top', 'ArrowRight' : 'right', 'ArrowDown' : 'bottom', 'ArrowLeft' : 'left' };

  if (! Object.keys(dir).includes(key)) return;

  if (!newMaze.currentCell.walls[dir[key]]) {
    let nextCell = newMaze.grid[y + DY[dir[key]]][x + DX[dir[key]]];
    newMaze.drawCell(newMaze.currentCell);
    newMaze.currentCell = nextCell;
    newMaze.drawImage(newMaze.currentCell, 'boy');
    if (newMaze.currentCell === newMaze.goal) complete.style.display = "block";
  }
}

export { move };