let color = {
  'background' : 'white',
  'wall' : 'black',
  'goal' : "rgb(83, 247, 43)",
  'highlight' : 'yellow',
};

class Maze_Backtracker {
  constructor(canvas, size, cellsinaLine) {
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = color.background;
    canvas.width = size;
    canvas.height = size;
    canvas.style.background = color.wall;
    
    this.size = size;
    this.columns = cellsinaLine;
    this.rows = cellsinaLine;

    this.cellSize = canvas.width / this.columns;
    this.border = this.cellSize / 2;
    // this.border = 2;

    this.grid = [];
    this.stack = [];
    this.currentCell;
    this.goal;
    this.isComplete = false;
  }

  // Set the grid: Create new this.grid array based on number of instance rows and columns
  init = () => {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        let cell = new Cell(c, r);
        row.push(cell);
      }
      this.grid.push(row);
    }
    // Set the starting and goal grid
    this.currentCell = this.grid[0][0];
    this.goal = this.grid[this.rows - 1][this.columns - 1];

    console.log(this.grid);
  }

  // Recursive call
  // generateMaze(withAnimation = false) {
  //   if (!this.algorithm()) {
  //     this.drawImage(this.goal, 'treasure');
  //     // this.drawMaze();
  //     return;
  //   }
  //   if (withAnimation)
  //   {
  //     // this.drawMaze();
  //     window.requestAnimationFrame(() => this.generateMaze(withAnimation)); 
  //     // requestAnimationFrame(this.generateMaze(withAnimation));
  //   }
  //   else 
  //     this.generateMaze(withAnimation);
  // }

  // Draw the canvas by setting the size and placing the cells in the grid array on the canvas.
  // drawMaze() {
  //   // Set the first cell as visited
  //   this.currentCell.visited = true;
  //   // Loop through the 2d grid array and call the show method for each cell instance
  //   for (let r = 0; r < this.rows; r++) {
  //     for (let c = 0; c < this.columns; c++) {
  //       let grid = this.grid;
  //       grid[r][c].drawCell();
  //     }
  //   }
  //   // this.currentCell.highlight();
  // }

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
      this.drawImage(this.currentCell, 'boy');
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
    cell.walls[getOpposite(dir)] = false;

    this.currentCell = cell;
  }

  drawWay = (wall) => {
    // console.log(wall);
    const DX = { 'right' : 0, 'left' : -1, 'top' : 0, 'bottom' : 0 };
    const DY = { 'right' : 0, 'left' : 0, 'top' : -1, 'bottom' : 0 };

    this.ctx.fillStyle = color.background;
    const long = this.cellSize * 2 - this.border;
    const short = this.cellSize - this.border;
    let width, height;
    const [x,y,dir] = wall;

    if (dir === 'top' || dir === 'bottom') {
      width = short;
      height = long;
    }
    else {
      width = long;
      height = short;
    }
    // console.log(this.getPoint(x + DX[dir]), this.getPoint(y+ DY[dir]), width, height);
    this.ctx.fillRect(this.getPoint(x + DX[dir]), this.getPoint(y+ DY[dir]), width, height);
  }

  drawCell = (cell) => {
    let size = this.cellSize - this.border;
    this.ctx.fillStyle = color.background;
    this.ctx.fillRect(this.getPoint(cell.x), this.getPoint(cell.y), size, size);
  }

  drawImage = (cell, name = 'boy') => {
    let img = new Image();
    if (name === 'boy') img.src = './image/sprite.png';
    else if (name === 'treasure') img.src = './image/finishSprite.png';
    // let margin = Math.floor(this.cellSize / 10);
    let margin = 1;
    let x = this.getPoint(cell.x) + margin;
    let y = this.getPoint(cell.y) + margin;
    let size = this.cellSize - this.border - 1;
    img.onload = () => this.ctx.drawImage(img, x, y, size, size);
  }

  getPoint = (p) => {
    return p * this.cellSize + this.border / 2;
  }
};

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = { top: true, right: true, bottom: true, left: true };
  }
};

const getOpposite = (dir) => {
  const OPPOSITE = { 'right' : 'left', 'left' : 'right', 'top' : 'bottom', 'bottom' : 'top' };
  return OPPOSITE[dir];
};

export { Maze_Backtracker };