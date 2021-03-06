import { BOARD_DEFAULT, CHECKERS_PER_PLAYER, NUM_OF_PLAYERS } from '../config/defaultOptions';
import { BoardError } from '../enums/Error';
import { Status } from '../enums/Status';
import { numOfRowsToSkip } from '../helpers/initializationHelper';


export interface BoardOptions {
  rows: number;
  cols: number;
}

export type BoardCell = {
  playerId: number,
  checkerId: number
}

// BOARD DECISIONS: I thought about putting a string 'empty' for a spot the player
//                  could move, but this made the data structure a bit too much
//                  probably a better way, but I decided to go with a BoardCell
//                  with playerId: 0 and checkerId: 0 to represent an empty location
export class Board {
  private _board: BoardCell[][] | null[][]= [];

  constructor(boardDimensions: BoardOptions = BOARD_DEFAULT, numOfPlayers: number = NUM_OF_PLAYERS, numOfCheckersPerPlayer: number = CHECKERS_PER_PLAYER)  {
    this._board = this.initializeBoard(boardDimensions, numOfPlayers, numOfCheckersPerPlayer);
  }

  get size() { return {rows: this._board.length, cols: this._board[0].length}; }

  public getCellValue(row: number, col: number) {
    //if (this._board[row][col] === null) {
       // first had it throwing an error, but decided to return
       // an error string instead, this broke the initialization
       // ... just taking it out now but would refactor later
       //return BoardError.SpaceNotValid;
    //}
    return this._board[row][col];
  }

  public setCellValue(row: number, col: number, newValue: BoardCell | null) {
    if (this._board[row][col] === null) {
      return Status.FAIL; // this could be better... more specific..
    }
    this._board[row][col] = newValue;
    return Status.SUCCESS;
  }

  private initializeBoard(boardDimensions: BoardOptions = BOARD_DEFAULT, numOfPlayers: number = NUM_OF_PLAYERS, numOfCheckersPerPlayer: number = CHECKERS_PER_PLAYER): BoardCell[][] | null[][] {
    let newBoard: BoardCell[][] | null[][] =[];
    let playerId: number = 1;
    let checkerId: number = 1;
    let skipRow = false;
    let rowsToSkip = numOfRowsToSkip(boardDimensions, numOfPlayers, numOfCheckersPerPlayer);
    const checkersInEachRow = 4; // need to calculate this.

    // if row is odd, marker should be place on even cols
    // if row is even, marker should be placed on odd cols
    for (let row = 0; row < boardDimensions.rows; row++) {
      let newRow = this.createBoardRow(boardDimensions, row, playerId, checkerId, checkersInEachRow, skipRow);
      newBoard[row] = newRow;
      if (!skipRow) {
        checkerId += checkersInEachRow;
      }
      if ((checkerId === numOfCheckersPerPlayer + 1) && !skipRow) {
        playerId++;
        skipRow = true;
      } 
      if (skipRow && rowsToSkip > 0 ) {
        rowsToSkip--;
      } else {
        skipRow = false;
      }
    }
    return newBoard;
  } 

  private createBoardRow(boardDimensions: BoardOptions, row:number, playerId: number, checkerId: number, checkersInEachRow: number, skipRow: boolean) {
    let newRow: BoardCell[] | null[] = [];
    let boardCell:BoardCell | string = (!skipRow) ? { playerId, checkerId } : { playerId: 0, checkerId: 0 };

    for (let col = 0; col < boardDimensions.cols; col++) {
      if ((row%2 === 0 && col%2 !== 0) || (row%2 !== 0 && col%2 === 0 )) { // even row odd cols || odd row even cols
        newRow[col] = boardCell;
        checkerId++;
        if (!skipRow) {
          boardCell = this.buildBoardCell(playerId, checkerId);
        }
      } else {
        newRow[col] = null;
      }
      
    }

    return newRow;
  }
  private buildBoardCell(player: number, checker: number): BoardCell {
    return { playerId: player, checkerId: checker }
  }
  
}
