import { Maze_Backtracker } from "./maze_backtracker.js";
import { Maze_Kruskal } from "./maze_kruskal.js";

// main maze class
let myMaze = {};

const callMaze = (maze, level = 'easy', withanimation = false, algorithm) => {
  const difficulty = { 
          'easy' : { mazeSize: 500, cells: 10 },
          'medium' : { mazeSize: 500, cells: 20 },
          'hard' : { mazeSize: 600, cells: 30 },
          'extreme' : { mazeSize: 800, cells: 50 },
        };
  if (algorithm === 'backtracker') 
    myMaze = new Maze_Backtracker(maze, difficulty[level].mazeSize, difficulty[level].cells);
  else
    myMaze = new Maze_Kruskal(maze, difficulty[level].mazeSize, difficulty[level].cells);

  myMaze.init();
  myMaze.algorithm(withanimation);
}

export { callMaze, myMaze };
