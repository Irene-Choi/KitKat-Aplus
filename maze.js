// define global variables

// main maze class
let myMaze = {};

// Initialize the canvas
let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");

let currentCell;
let goal;
let generationComplete = false;
let color = {
  'background' : 'white',
  'wall' : 'black',
  'goal' : "rgb(83, 247, 43)",
  'highlight' : 'yellow',
};

class Maze {
  constructor(size, cellsinaLine) {
    this.size = size;
    this.columns = cellsinaLine;
    this.rows = cellsinaLine;
    this.grid = [];
    this.stack = [];
  }

  // Set the grid: Create new this.grid array based on number of instance rows and columns
  initGrid() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // Create a new instance of the Cell
        let cell = new Cell(r, c, this.grid, this.size, this.rows, this.columns);
        row.push(cell);
      }
      this.grid.push(row);
    }
    // Set the starting grid
    currentCell = this.grid[9][0];
    // this.grid[this.rows - 1][this.columns - 1].goal = true;
    this.grid[0][this.columns - 1].goal = true;
    console.log(this.grid);
    this.drawMaze();
  }

  drawMaze() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = color.background;

    // Set the first cell as visited
    currentCell.visited = true;
    // Loop through the 2d grid array and call the show method for each cell instance
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].drawCell();
      }
    }
    currentCell.highlight();
  }
}

class Cell {
  // Constructor takes in the iRow and iCol which will be used as coordinates to draw on the canvas.
  constructor(iRow, iCol, parentGrid, mazeSize, mazeCols, mazeRows) {
    this.iRow = iRow;
    this.iCol = iCol;
    this.visited = false;
    this.goal = false;

    this.width = mazeSize / mazeCols;
    this.height = mazeSize / mazeRows;
    this.x = (this.iCol * mazeSize) / mazeCols;
    this.y = (this.iRow * mazeSize) / mazeRows;

    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true,
    };

    // parentGrid is passed in to enable the checkneighbours method.
    this.parentGrid = parentGrid;
  }

  drawWall(dir, x, y) {
    ctx.beginPath();
    switch (dir) {
      case 'top' :
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.width, y);
        break;
      case 'right' :
        ctx.moveTo(x + this.width, y);
        ctx.lineTo(x + this.width, y + this.height);
        break;
      case 'bottom' :
        ctx.moveTo(x, y + this.height);
        ctx.lineTo(x + this.width, y + this.height);
        break;
      case 'left' :
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + this.height);
        break;
      default:
        break;
    }
    ctx.stroke();
  }

  // Highlights the current cell on the grid. Columns is once again passed in to set the size of the grid.
  highlight() {
    ctx.fillStyle = color.highlight;
    ctx.fillRect(
      this.x + 1, this.y + 1,
      this.width - 2, this.height - 2
    );
  }

  removeWall(dir) {
    this.walls[dir] = false;
  }

  getOpposite (dir) {
    switch(dir) {
      case "right":   return "left";
      case "bottom":  return "top";
      case "left":    return "right";
      case "top":     return "bottom";
    } 
  }

  // Draws each of the cells on the maze canvas
  drawCell() {
    const x = this.x;
    const y = this.y;

    ctx.strokeStyle = color.wall;
    ctx.fillStyle = color.background;
    ctx.lineWidth = 2;

    if (this.walls.top) this.drawWall('top', x, y);
    if (this.walls.right) this.drawWall('right', x, y);
    if (this.walls.bottom) this.drawWall('bottom', x, y);
    if (this.walls.left) this.drawWall('left', x, y);
    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, this.width - 2, this.height - 2);
    }
    if (this.goal) {
      this.drawImage('treasure');
    }
  }

  // draw images (boy, treasure box)
  drawImage(name = 'boy') {
    let img = new Image();
    if (name === 'boy') img.src = './image/sprite.png';
    else if (name === 'treasure') img.src = './image/finishSprite.png';
    let margin = Math.floor(this.width / 10);
    img.onload = () => ctx.drawImage(img, this.x + margin, this.y + margin, this.width - 2 * margin , this.height - 2 * margin);
  }
}

const callMaze = (level, withanimation = false) => {
  let mazeSize = 500;
  let cells = 10;
  switch (level) {
    case 'easy':
      mazeSize = 500;
      cells = 10;
      break;
    case 'medium':
      mazeSize = 500;
      cells = 20;
      break;    
    case 'hard':
      mazeSize = 600;
      cells = 30;
      break;      
    case 'extreme':
      mazeSize = 900;
      cells = 60;
      break;
  }
  myMaze = new Maze(mazeSize, cells);
  myMaze.initGrid();
}

callMaze('easy', true);
// callMaze('medium', true);
// callMaze('hard', true);
// callMaze('extreme', true);