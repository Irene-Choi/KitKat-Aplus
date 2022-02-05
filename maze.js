import { Maze_Backtracker } from "./maze_backtracker.js";
import { Maze_Kruskal } from "./maze_kruskal.js";

// main maze class
let myMaze = {};

const callMaze = (maze, level = 'easy', withanimation = false) => {
  const difficulty = { 
          'easy' : { mazeSize: 500, cells: 10 },
          'medium' : { mazeSize: 500, cells: 20 },
          'hard' : { mazeSize: 600, cells: 30 },
          'extreme' : { mazeSize: 900, cells: 60 },
        };

  // myMaze = new Maze_Kruskal(maze, difficulty[level].mazeSize, difficulty[level].cells);
  myMaze = new Maze_Backtracker(maze, difficulty[level].mazeSize, difficulty[level].cells);
  myMaze.init();
  myMaze.algorithm(withanimation);

}

export { callMaze, myMaze };
