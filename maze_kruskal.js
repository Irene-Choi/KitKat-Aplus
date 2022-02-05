class Maze_Kruskal {
  constructor (canvas, size, cellsinaLine) {
    this.ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    canvas.style.background = 'black';
    this.height = cellsinaLine;
    this.width = cellsinaLine;
    this.cellSize = canvas.width / this.width;
    this.border = this.cellSize / 2;
    // this.border = 2;

    this.grid = [];
    this.walls = [];
  }

  init = () => {
    for(let r = 0; r < this.height; r++) {
      let row = [];
      for(let c = 0; c < this.width; c++) {
        if (r > 0) this.walls.push([c,r,'N']);
        if (c > 0) this.walls.push([c,r,'W']);
    
        let cell = new Cell_Kruskal(r,c);
        row.push(cell);
      }  
      this.grid.push(row);
    }
    // make random wall array
    this.walls = shuffle(this.walls);
  }

  algorithm = () => {
    // while (this.walls.length > 0) {
      const wall = this.walls.pop();
      const [cell1, cell2] = this.getTwoCells(wall);
      
      if (! cell1.isConnected(cell2)) {
        this.connect(cell1, cell2);
        this.drawWay(wall);
      } 

    // if (this.walls.length === 0) clearInterval(stopInterval);
    if (this.walls.length > 0 && cell1.set.length < this.width * this.height) requestAnimationFrame(this.algorithm);
  }

  connect = (cell1, cell2) => {
    // merge two arrays
    let mergeArr = Array.from(new Set([...cell1.set, ...cell2.set]));
    // console.log('mergeArr', mergeArr);
    // update all included set
    mergeArr.forEach( (cell) => {
      let [x, y] = cell.split('.');
      this.grid[x][y].set = mergeArr;
    });
  }

  drawWay = (wall) => {
    this.ctx.fillStyle = "white";
    const long = this.cellSize * 2 - this.border;
    const short = this.cellSize - this.border;
    const [x,y,dir] = wall;

    if (dir === 'N') {
      let startX = (x) * this.cellSize + this.border / 2;
      let startY = (y-1) * this.cellSize + this.border / 2;
      this.ctx.fillRect(startX, startY, short, long);
    }
    else {
      let startX = (x-1) * this.cellSize + this.border / 2;
      let startY = (y) * this.cellSize + this.border / 2;
      this.ctx.fillRect(startX, startY, long, short);
    }
  }

  getTwoCells = (wall) => {
    const DX = { W : -1, N : 0 };
    const DY = { N : -1, W : 0 };
    const [x,y,dir] = wall;

    let cell1 = this.grid[x][y];
    let cell2 = this.grid[x + DX[dir]][y + DY[dir]];
    return [cell1, cell2];
  }

}

class Cell_Kruskal {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    // this.root = `${x}.${y}`;
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

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export { Maze_Kruskal };

// const canvas = document.getElementById('maze');
// let maze = new Maze_Kruskal(canvas, 500, 10);
// maze.init();
// maze.algorithm();
// let stopInterval = setInterval(maze.algorithm, 500);