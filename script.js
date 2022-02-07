import { callMaze } from "./call_maze.js";
import { move } from "./mazegame.js";

const maze = document.getElementById('maze');
let complete = document.querySelector(".complete");
let run = document.querySelector(".run");
let maze_container = document.querySelector(".maze");

run.addEventListener("click", call);

function call()
{
  let level = document.querySelector('input[name="level"]:checked').value;
  let animation = document.getElementById('animation').checked;
  let algorithm = document.querySelector('input[name="algorithm"]:checked').value;
  let borderstyle = document.querySelector('input[name="borderstyle"]:checked').value;
  // maze_container.style.display = "initial";
  complete.style.display = "none";
  maze_container.style.visibility = "visible";
  // console.log(level, animation, algorithm, borderstyle);

  callMaze(maze, level, animation, algorithm, borderstyle);
}