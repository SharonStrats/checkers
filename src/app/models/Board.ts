import { BOARD_DEFAULT, CHECKERS_PER_PLAYER, NUM_OF_PLAYERS } from '../config/defaultOptions';
import { numOfRowsToSkip } from '../helpers/initializationHelper';

export interface BoardOptions {
  rows: number;
  cols: number;
}

export type BoardCell = {
  playerId: number,
  checkerId: number
}

export class Board {
  board: BoardCell[][] | null[][] = [];

  constructor(boardDimensions: BoardOptions = BOARD_DEFAULT, numOfPlayers: number = NUM_OF_PLAYERS, numOfCheckersPerPlayer: number = CHECKERS_PER_PLAYER)  {
    this.board = this.initializeBoard(boardDimensions, numOfPlayers, numOfCheckersPerPlayer);
  }

  private initializeBoard(boardDimensions: BoardOptions = BOARD_DEFAULT, numOfPlayers: number = NUM_OF_PLAYERS, numOfCheckersPerPlayer: number = CHECKERS_PER_PLAYER): BoardCell[][] | null[][] {
    let newBoard: BoardCell[][] | null[][] =[];
    let playerId: number = 1;
    let checkerId: number = 1;
    let skipRow = false;
    let rowsToSkip = numOfRowsToSkip();
    const checkersInEachRow = 4; // need to calculate this.

    // if row is odd, marker should be place on even cols
    // if row is even, marker should be placed on odd cols
    for (let row = 0; row < boardDimensions.rows; row++) {
      let newRow = this.createBoardRow(boardDimensions, row, playerId, checkerId, checkersInEachRow, skipRow);
      newBoard[row] = newRow;
      console.log("new Row 1 " + newRow);
      if (!skipRow) {
        checkerId += checkersInEachRow;
      }
      if (checkerId === numOfCheckersPerPlayer + 1) {
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
    let boardCell: BoardCell = { playerId, checkerId };

    for (let col = 0; col < boardDimensions.cols; col++) {
      if (((row%2 === 0 && col%2 !== 0) || (row%2 !== 0 && col%2 === 0 )) && !skipRow) { // even row odd cols || odd row even cols
      newRow[col] = boardCell;
        checkerId++;
      } else {
        newRow[col] = null;
      }
      boardCell = this.buildBoardCell(playerId, checkerId);
    }

    return newRow;
  }
  private buildBoardCell(player: number, checker: number): BoardCell {
    return { playerId: player, checkerId: checker }
  }
  
}
