import { Maze_Backtracker } from "./maze_backtracker.js";
import { Maze_Kruskal } from "./maze_kruskal.js";

// main maze class
let myMaze = {};

const callMaze = (maze, level = 'easy', withanimation = false, algorithm, borderstyle) => {
  const difficulty = { 
          'easy' : { mazeSize: 400, cells: 8 },
          'medium' : { mazeSize: 500, cells: 14 },
          'hard' : { mazeSize: 600, cells: 20 },
          'extreme' : { mazeSize: 900, cells: 40 },
        };
  if (algorithm === 'backtracker') 
    myMaze = new Maze_Backtracker(maze, difficulty[level].mazeSize, difficulty[level].cells);
  else
    myMaze = new Maze_Kruskal(maze, difficulty[level].mazeSize, difficulty[level].cells);

  myMaze.init();
  myMaze.setBorderStyle(borderstyle);
  // myMaze.setBGImage('./image/blue_block.jpg');
  myMaze.algorithm(withanimation);
}

export { callMaze, myMaze };
