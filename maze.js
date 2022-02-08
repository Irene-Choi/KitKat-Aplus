class Maze {
  constructor(canvas, size, cellsinaLine) {
    this.color = {
      background : 'white',
      wall : '#000000A0',
    }
    this.ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    canvas.style.background = this.color.wall;

    this.height = cellsinaLine;
    this.width = cellsinaLine;
    // this.columns = cellsinaLine;
    // this.rows = cellsinaLine;

    this.size = size;
    this.cellSize = canvas.width / this.width;
    // this.border = this.cellSize / 2;
    this.border = 2;

    this.grid = [];
    this.currentCell;
    this.goal;
    this.isComplete = false;
  }

  drawWay = (wall) => {
    this.ctx.fillStyle = this.color.background;
    // console.log(wall);
    const DX = { 'right' : 0, 'left' : -1, 'top' : 0, 'bottom' : 0 };
    const DY = { 'right' : 0, 'left' : 0,  'top' : -1,'bottom' : 0 };
    let [DW, DH] = [1, 1];
    const [x,y,dir] = wall;

    // if (dir === 'top' || dir === 'bottom') {
    if (['top', 'bottom'].includes(dir)) { [DW, DH] = [1, 2]; }
    else { [DW, DH] = [2, 1]; }

    const width = this.cellSize * DW  - this.border;
    const height = this.cellSize * DH - this.border;

    // console.log(this.getPoint(x + DX[dir]), this.getPoint(y+ DY[dir]), width, height);
    this.ctx.fillRect(this.getPoint(x + DX[dir]), this.getPoint(y+ DY[dir]), width, height);
  }

  drawCell = (cell, color = this.color.background) => {
    let size = this.cellSize - this.border;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.getPoint(cell.x), this.getPoint(cell.y), size, size);
  }

  drawImage = (cell, name = 'boy-right') => {
    let img = new Image();
    if (name === 'boy-right') img.src = './image/sprite-right.png';
    else if (name === 'boy-left') img.src = './image/sprite-left.png';
    else if (name === 'treasure') img.src = './image/finishSprite.png';
    // let margin = Math.floor(this.cellSize / 10);
    let margin = 1;
    let x = this.getPoint(cell.x) + margin;
    let y = this.getPoint(cell.y) + margin;
    let size = this.cellSize - this.border - 1;
    img.onload = () => this.ctx.drawImage(img, x, y, size, size);
  }

  setBorderStyle = (style) => {
    if (style === 'thin') this.border = 2;
    else this.border = this.cellSize / 2;
  }

  getPoint = (p) => {
    return p * this.cellSize + this.border / 2;
  }

  getOpposite = (dir) => {
    const OPPOSITE = { 'right' : 'left', 'left' : 'right', 'top' : 'bottom', 'bottom' : 'top' };
    return OPPOSITE[dir];
  };
};

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = { top: true, right: true, bottom: true, left: true };
  }
};
 
export { Maze, Cell }