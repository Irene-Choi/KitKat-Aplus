import { Maze, Cell } from "./maze.js";

class Maze_Kruskal extends Maze {
  constructor (canvas, size, cellsinaLine) {
    super(canvas, size, cellsinaLine);
    this.walls = [];
  }

  init = () => {
    for(let y = 0; y < this.height; y++) {
      let row = [];
      for(let x = 0; x < this.width; x++) {
        if (y > 0) this.walls.push([x,y,'top']);
        if (x > 0) this.walls.push([x,y,'left']);
    
        let cell = new Cell_Kruskal(x, y);
        row.push(cell);
      }  
      this.grid.push(row);
    }
    // make random wall array
    this.walls = this.shuffle(this.walls);

    // Set the starting and goal grid
    this.currentCell = this.grid[0][0];
    this.goal = this.grid[this.height - 1][this.width - 1];
  }

  algorithm = (withAnimation) => {
    // while (this.walls.length > 0) {
      const wall = this.walls.pop();
      const [cell1, cell2] = this.getTwoCells(wall);
      
      if (! cell1.isConnected(cell2)) {
        this.connect(wall);
        this.drawWay(wall);
      } 

    // if (this.walls.length === 0) clearInterval(stopInterval);
    if (this.walls.length > 0 && cell1.set.length < this.width * this.height) {
        // recursive call
      if (withAnimation)
        requestAnimationFrame(this.algorithm);
      else 
        this.algorithm(withAnimation);
    } else {
      this.isComplete = true;
      this.drawImage(this.currentCell);
      this.drawImage(this.goal, 'treasure');
    }
  }

  connect = (wall) => {
    const [cell1, cell2] = this.getTwoCells(wall);
    const dir = wall[2];
    // merge two arrays
    let mergeArr = Array.from(new Set([...cell1.set, ...cell2.set]));
    // console.log('mergeArr', mergeArr);
    // update all included set
    mergeArr.forEach( (cell) => {
      let [x, y] = cell.split('.');
      this.grid[y][x].set = mergeArr;
    });

    cell1.walls[dir] = false;
    cell2.walls[this.getOpposite(dir)] = false;
  }

  getTwoCells = (wall) => {
    const DX = { 'left' : -1, 'top' : 0 };
    const DY = { 'top' : -1, 'left' : 0 };
    const [x,y,dir] = wall;

    let cell1 = this.grid[y][x];
    let cell2 = this.grid[y + DY[dir]][x + DX[dir]];
    return [cell1, cell2];
  }

  shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  }
}

class Cell_Kruskal extends Cell {
  constructor (x,y) {
    super(x,y);
    // this.x = x;
    // this.y = y;
    // this.walls = { top: true, right: true, bottom: true, left: true };
    this.set = [`${x}.${y}`];
  }

  isConnected = (cell) => {
    if (this.set.length === 1 && cell.set.length === 1) return false;
    else if (this.set.length === cell.set.length) {
      // console.log('connected', this.x, this.y, cell.x, cell.y);
      return true;
    } else return false;
  }
}

export { Maze_Kruskal };