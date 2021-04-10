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
  boardState: Map<number, Checker>;
  checkerState: CheckerState[];

  constructor(boardDimensions: BoardOptions = BOARD_DEFAULT, players: Player[], boardState: Checker[], checkerState: CheckerState[],  numOfCheckersPerPlayer: number = CHECKERS_PER_PLAYER ) {
    this.board = new Board(boardDimensions, NUM_OF_PLAYERS, CHECKERS_PER_PLAYER);
    this.players = players;
    this.boardState = this.initializeBoardState();
    this.checkerState = checkerState;
  }

  private initializeBoardState(): Map<number, Checker> {
    let checkerPosition: Position;
    let boardState: Map<number, Checker> = new Map();
    let checker: Checker;

    for (let row = 0; row < this.board.size.rows; row++) {
      for (let col = 0; col < this.board.size.cols; col++) {
        let cell = this.board.getCellValue(row, col);
        if (cell) {
          checkerPosition = { row, col };
          checker = this.buildChecker(cell.playerId, checkerPosition);
          console.log(cell.checkerId);
          console.log(JSON.stringify(checker));
          boardState.set(cell.checkerId, checker);
        }
      }
    }
    return boardState;
  }
  
  private buildChecker = (playerId: number, position: Position) => {
    let direction: string;

    if (playerId === 1) {
      direction = 'forward';
    } else {
      direction = 'backward';
    }
    return { playerId, position, direction };
  }
}
export default Game;