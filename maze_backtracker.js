import { Maze, Cell } from "./maze.js";

class Maze_Backtracker extends Maze {
  constructor(canvas, size, cellsinaLine) {
    super(canvas, size, cellsinaLine);
    this.stack = [];
  }

  // Set the grid: Create new this.grid array based on number of instance rows and columns
  init = () => {
    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        let cell = new Cell(x, y);
        row.push(cell);
      }
      this.grid.push(row);
    }
    // Set the starting and goal grid
    this.currentCell = this.grid[0][0];
    this.goal = this.grid[this.height - 1][this.width - 1];
    // console.log(this.grid);
  }

  algorithm = (withAnimation = false) => {
    // This function will assign the variable 'nextCell' to random cell out of the current cells available neighbouting cells
    let next = this.checkNeighbours(this.currentCell);

    // If there is a non visited neighbour cell
    if (next) {
      let dir = Object.keys(next)[0];
      let nextCell = Object.values(next)[0];
      // mark as visited
      nextCell.visited = true;
      // Add the current cell to the stack for backtracking
      this.stack.push(this.currentCell);
      this.drawWay([this.currentCell.x, this.currentCell.y, dir]);
      this.moveNext(nextCell, dir);

    // Else if there are no available neighbours start backtracking using the stack
    } else if (this.stack.length > 0) {
      this.currentCell = this.stack.pop();
    }

    // If no more items in the stack then all cells have been visted and the function can be exited
    if (this.stack.length === 0) {
      this.isComplete = true;
      this.drawImage(this.currentCell);
      this.drawImage(this.goal, 'treasure');
      return false;
    }

    // recursive call
    if (withAnimation)
      requestAnimationFrame(this.algorithm);
    else 
      this.algorithm(withAnimation);
  }

  checkNeighbours = (cell) => {
    const DX = { 'right' : 1, 'left' : -1, 'top' : 0, 'bottom' : 0 };
    const DY = { 'right' : 0, 'left' : 0, 'top' : -1, 'bottom' : 1 };
    const dirs = ['top', 'right', 'bottom', 'left' ];
    let neighbours = []; // not visited neighbours

    dirs.forEach( (dir) => {
      let x = cell.x + DX[dir];
      let y = cell.y + DY[dir];
      // console.log(x,y,dir);
      if ( 0 <= x && x < this.grid.length && 0 <= y && y < this.grid.length) {
        let neighbour = this.grid[y][x];
        if (!neighbour.visited) neighbours.push({ [dir] : neighbour });
      }
    })
    // console.log(neighbours);
    // Choose a random neighbour from the neighbours array
    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return false;
    }
  }

  moveNext = (cell, dir) => {
    this.currentCell.walls[dir] = false;
    cell.walls[this.getOpposite(dir)] = false;

    this.currentCell = cell;
  }
};



export { Maze_Backtracker };