import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import {toggleSurrounding as flipCellsAroundMe} from "./helperFunctions";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      initialBoard.push(Array.from({ length: ncols }).map((c) => false));
    }

    return initialBoard;
  }

  /**
   * Returns a boolean
   * True if all cells are true, False if any cells are false
   */
  function hasWon(gameBoard) {
    // TODO check the board in state to determine whether the player has won.

    // QUESTION: use filter?
    for (let row of gameBoard) {
      for (let cell of row) {
        if (cell === false) return false;
      }
    }
    return true;
  }





  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);
      // "1-1"
      // ["1", "1"]
      // [1,1]

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(x => x);


      function flipCellsAroundMe(x,y, boardPar){
        flipCell(y, x, boardPar);
        flipCell(y + 1, x, boardPar);
        flipCell(y - 1, x, boardPar);
        flipCell(y, x + 1, boardPar);
        flipCell(y, x - 1, boardPar);
      }

      flipCellsAroundMe(x, y, boardCopy);

      return boardCopy;

    });
  }

  // if the game is won, just show a winning msg & render nothing else
  let won = hasWon();


  return(
    <div>
      <p>{won && 'You Won!'}</p>
      <div>{board}</div>
    </div>

  )
}


export default Board
