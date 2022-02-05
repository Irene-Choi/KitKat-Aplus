import { callMaze } from "./call_maze.js";
import { move } from "./mazegame.js";

let complete = document.querySelector(".complete");
let replay = document.querySelector(".replay");
let close = document.querySelector(".close");
let run = document.querySelector(".run");

replay.addEventListener("click", () => location.reload() );
close.addEventListener("click", () => complete.style.display = "none");
document.addEventListener("keydown", move);
run.addEventListener("click", () => call() );

function call(level = 'easy')
{
  const maze = document.getElementById('maze');
  // const difficulty = document.querySelector();
  const difficulty = 'easy';
  callMaze(maze, difficulty, true);
}