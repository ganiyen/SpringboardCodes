class Game {
  constructor(height, width, p1, p2){
    this.height = height;
    this.width = width;
    this.board = [];

    this.p1 = p1.color;
    this.p2 = p2.color;
    this.currPlayer = this.p1;

    this.makeBoard();
    this.makeHtmlBoard();

    this.isGameEnd = false;
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    //console.log(this);
    top.addEventListener('click', this.handleClick.bind(this));
  
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  }

  handleClick (evt) {
    if(!this.isGameEnd) {
      // get x from ID of clicked cell
      const x = +evt.target.id;
    
      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
    
      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
      //debugger;
      // check for win
      if (this.checkForWin()) {
        this.isGameEnd=true;
        return this.endGame(`Player ${this.currPlayer} won!`);
      }
      
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        this.isGameEnd=true;
        return this.endGame('Tie!');
      }
        
      // switch players
      this.currPlayer = this.currPlayer === this.p1? this.p2 : this.p1;
    }
  }

  endGame(msg) {
    alert(msg);
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  testing(){
    console.log("testing")
  }

  placeInTable (y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style = `background-color:${this.currPlayer}`
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  checkForWin() {

    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    }
  
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win.call(this,horiz) || _win.call(this,vert) || _win.call(this,diagDR) || _win.call(this,diagDL)) {
          return true;
        }
      }
    }
  }
}

//Identify the player by its color
class Player {
  constructor(color){
    this.color=color;
  }
}

//start the game when the Start button is clicked. Take user color inputs for Player 1 and Player 2
const form = document.querySelector("form")
form.addEventListener("submit", function(evt){
    evt.preventDefault();
    document.querySelector("#board").innerHTML = '';  
 
    const p1Color = document.querySelector("#p1").value
    const p2Color = document.querySelector("#p2").value
    const p1 = new Player(p1Color);
    const p2 = new Player(p2Color);

    const newGame = new Game(6,7,p1,p2);
 })


