import { callMaze } from "./call_maze.js";
import { move } from "./mazegame.js";

const maze = document.getElementById('maze');
let complete = document.querySelector(".complete");
let replay = document.querySelector(".replay");
// let close = document.querySelector(".close");
let run = document.querySelector(".run");
let maze_container = document.querySelector(".maze");

// replay.addEventListener("click", () => location.reload() );
replay.addEventListener("click", () => {
  complete.style.display = "none";
  maze_container.style.visibility = "hidden";
});
document.addEventListener("keydown", move);
run.addEventListener("click", call);
// document.onload(() => complete.style.display = "none");

function call()
{
  let level = document.querySelector('input[name="level"]:checked').value;
  let animation = document.querySelector('input[name="animation"]').checked;
  let algorithm = document.querySelector('input[name="algorithm"]:checked').value;
  // maze_container.style.display = "initial";
  maze_container.style.visibility = "visible";
  console.log(level, animation, algorithm);

  callMaze(maze, level, animation, algorithm);
}