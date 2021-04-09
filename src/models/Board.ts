import { CHECKERS_PER_PLAYER, NUM_OF_PLAYERS } from '../config/defaultOptions';
import { Checker, Position } from '../models/Game';

export interface BoardOptions {
  rows: number;
  cols: number;
}

export class Board {

  constructor(boardDimensions: BoardOptions, numOfPlayers: number, numOfCheckersPerPlayer: number) {
    let board: Checker[] = [];
    const numOfCheckers = numOfPlayers * numOfCheckersPerPlayer;
    let checker: Checker;
    let row: number = 0;
    let col: number = 0;
    let checkerPosition: Position = { row, col };
    let skipRows: boolean = false;
    let direction: string = 'forward';
    let player: number = 1;
  
    for (let i = 0; i < numOfCheckers; i++) {
  
      checker = this._buildChecker(player, checkerPosition, direction);
      if (i === numOfCheckersPerPlayer - 1) {
        skipRows = true;
        checkerPosition = this._nextBoardPosition(boardDimensions, checkerPosition, skipRows);
        skipRows = false;
        player++;
        direction = 'backward';
      } else {
        checkerPosition = this._nextBoardPosition(boardDimensions, checkerPosition, skipRows);
      }
  
      board[i] = checker;
    }
  }

  private createPosition = (row:number, col: number) => {
    return { row, col };
  }

  private numOfRowsToSkip = () => {
  
    return 2;
  }
  
  private nextBoardPosition = (boardDimensions: BoardOptions, curCheckerPosition: Position, skipRows: boolean) => {
    let newCol: number = curCheckerPosition.col;
    let newRow: number = curCheckerPosition.row;
  
    if (skipRows) {
      newRow += this.numOfRowsToSkip();
    }
  
    newCol += 2;
    if (newCol >= boardDimensions.cols) {
      newRow++;
      if (newRow%2 === 0) {  // even row
        newCol = 0;
      } else {  // odd row
        newCol = 1;
      }
    }
  
    return { row: newRow, col: newCol };
  }
   private buildChecker = (playerId: number, position: Position, direction: string) => {
  
    return { playerId, position, direction };
  }
}
