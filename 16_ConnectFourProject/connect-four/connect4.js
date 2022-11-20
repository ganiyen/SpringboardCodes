/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i=0; i <= HEIGHT-1; i++) {
    let temp = [];
    for (let i=0; i <= WIDTH-1; i++) {
      temp.push(null);
    }
    board.push(temp);
  }  
  //return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  htmlBoard = document.querySelector("#board")

  // Create HTML elements for the top row of the board
  let top = document.createElement("tr"); //<tr></tr>
  top.setAttribute("id", "column-top");   //<tr id="column-top"></tr>
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); //<td></td>
    headCell.setAttribute("id", x);              //<td id="x"></td>
    top.append(headCell);                        
  }
    // top:
    // <tr id="column-top">
    //   <td id="0"></td>
    //   <td id="1"></td>
    //   <td id="2"></td>
    //   <td id="3"></td>
    //   <td id="4"></td>
    //   <td id="5"></td>
    //   <td id="6"></td>
    // </tr>

  htmlBoard.append(top);

  // Create HTML elements for the remaining rows of the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //<tr></tr>
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //<td></td>
      cell.setAttribute("id", `${HEIGHT-1-y}-${x}`);      //<td id="0-0"></td>
      row.append(cell);
    }   
    //  <tr> --> row
    //   <td id="0-0"></td> --> cell
    //   <td id="0-1"></td>
    //   <td id="0-2"></td>
    //   <td id="0-3"></td>
    //   <td id="0-4"></td>
    //   <td id="0-5"></td>
    //   <td id="0-6"></td>
    //  </tr>
    //  <tr>
    //  <td id="1-0"></td>
    //  <td id="1-1"></td>
    //  <td id="1-2"></td>
    //  <td id="1-3"></td>
    //  <td id="1-4"></td>
    //  <td id="1-5"></td>
    //  <td id="1-6"></td>
    // </tr>
    // ...

    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  const columnArr = [];
  for (let i=0; i <= HEIGHT-1; i++){
    columnArr.push(board[i][x]);
  }
  for (let i=0; i <= columnArr.length-1; i++){
    if (columnArr[i] === null){
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // This function should add a div inside the correct td cell in the HTML game board. 
  // This div should have the piece class on it, and should have a class for whether the current player is 1 or 2,
  //  like p1 or p2.

  //<div class="piece" class="p1">
  //</div>
  const newPiece =  document.createElement("div")
  newPiece.classList.add("piece");
  if (currPlayer === 1){
    newPiece.classList.add("p1");  
  }
  else {
    newPiece.classList.add("p2");  
  }
  
  xy = document.getElementById(`${y}-${x}`)
  xy.append(newPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (isBoardFull()) {
    endGame("Board is filled, no winner");
  };

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

function isBoardFull() {
  let temp = [];

  //check by row first
  for (i=0; i <= HEIGHT-1; i++){
    temp[i] = board[i].every(val => {
                if (val !== null) {
                  return true;
                } else {
                  return false;
                }
              });
  }

  let result = temp.every(val => {
                  if (val === true) {
                    return true;
                  } else {
                    return false;
                  }
                });

  console.log("temp",temp);
  console.log("result",result)
  return result;
}



/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // check for horizontal match
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];  // check for vertical match
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // check for right diagonal match
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // check for left diagonal match

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if either horizontal, vertical, or diagonal matches, then the currPlayer wins
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
