import { Player } from './Player';
import { Board, BoardOptions, BoardCell } from './Board';
import { BOARD_DEFAULT, NUM_OF_PLAYERS, CHECKERS_PER_PLAYER } from '../config/defaultOptions';
import { numOfRowsToSkip } from '../helpers/initializationHelper';

Object.freeze({
  FORWORD: 'forward',
  BACKWARD: 'backward'
});

export type Position = {
  row: number,
  col: number
}

export interface Checker {
  playerId: number,
  position: Position,
  direction: string
}

export interface CheckerState {
  pieceId: number,
  kinged: boolean
}

export class Game {
  board:  Board;
  players: Player[];
  boardState: Checker[];
  checkerState: CheckerState[];

  constructor(boardDimensions: BoardOptions = BOARD_DEFAULT, players: Player[], boardState: Checker[], checkerState: CheckerState[],  numOfCheckersPerPlayer: number = CHECKERS_PER_PLAYER ) {
    this.board = new Board(boardDimensions, NUM_OF_PLAYERS, CHECKERS_PER_PLAYER);
    this.players = players;
    this.boardState = this.initializeCheckerStatus(boardDimensions, players.length, numOfCheckersPerPlayer );
    this.checkerState = checkerState;
  }

  private initializeCheckerStatus = (boardDimensions: BoardOptions, numOfPlayers: number, numOfCheckersPerPlayer: number) => {
    const checkers: Checker[] = [];
    const numOfCheckers = numOfPlayers * numOfCheckersPerPlayer;
    let checker: Checker;
    let row: number = 0;
    let col: number = 0;
    let checkerPosition: Position = { row, col };
    let skipRows: boolean = false;
    let direction: string = 'forward';
    let player: number = 1;
  
    for (let i = 0; i < numOfCheckers; i++) {
  
      checker = this.buildChecker(player, checkerPosition, direction);
      if (i === numOfCheckersPerPlayer - 1) {
        skipRows = true;
        checkerPosition = this.nextBoardPosition(boardDimensions, checkerPosition, skipRows);
        skipRows = false;
        player++;
        direction = 'backward';
      } else {
        checkerPosition = this.nextBoardPosition(boardDimensions, checkerPosition, skipRows);
      }
  
      checkers[i] = checker;
    }
    return checkers;
  }

 
  private nextBoardPosition = (boardDimensions: BoardOptions, curCheckerPosition: Position, skipRows: boolean) => {
    let newCol: number = curCheckerPosition.col;
    let newRow: number = curCheckerPosition.row;
  
    if (skipRows) {
      newRow += numOfRowsToSkip();
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
export default Game;