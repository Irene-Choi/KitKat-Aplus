// let complete = document.querySelector(".complete");
// let replay = document.querySelector(".replay");
// let close = document.querySelector(".close");

document.addEventListener("keydown", move);
// replay.addEventListener("click", () => location.reload() );
// close.addEventListener("click", () => complete.style.display = "none");

function move(e) {
  if (!generationComplete) return;
  let key = e.key;
  let row = currentCell.iRow;
  let col = currentCell.iCol;
  let nextCell = false;

  switch (key) {
    case "ArrowUp":
      if (!currentCell.walls.top) {
        nextCell = newMaze.grid[row - 1][col];
      }
      break;

    case "ArrowRight":
      if (!currentCell.walls.right) {
        nextCell = newMaze.grid[row][col + 1];
      }
      break;

    case "ArrowDown":
      if (!currentCell.walls.bottom) {
        nextCell = newMaze.grid[row + 1][col];
      }
      break;

    case "ArrowLeft":
      if (!currentCell.walls.left) {
        nextCell = newMaze.grid[row][col - 1];
      }
      break;
  }
  if (nextCell) {
    currentCell.drawCell();

    currentCell = nextCell;
    currentCell.drawImage('boy');
    if (currentCell.goal) complete.style.display = "block";
  }

}