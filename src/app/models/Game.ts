import { Player } from './Player';
import { Board, BoardOptions } from './Board';
import { BOARD_DEFAULT, NUM_OF_PLAYERS, CHECKERS_PER_PLAYER } from '../config/defaultOptions';

export const Direction = Object.freeze({
  FORWORD: 'forward',
  BACKWARD: 'backward'
});

export type Position = {
  row: number,
  col: number
}

export interface Checker {
  checkerId: number,
  playerId: number,
  position: Position,
  direction: string
}

export interface CheckerState {
  pieceId: number,
  kinged: boolean
}

export class Game {
  private _board:  Board;
  private _players: Player[];
  private _boardState: Map<number, Checker>;
  private _checkerState: Map<number, CheckerState>;

  constructor(boardDimensions: BoardOptions = BOARD_DEFAULT, players: Player[], numOfCheckersPerPlayer: number = CHECKERS_PER_PLAYER ) {
    this._board = new Board(boardDimensions, players.length, numOfCheckersPerPlayer);
    this._players = players;
    this._boardState = this.initializeBoardState();
    this._checkerState = new Map();
  }

  get board() { return this._board; } 

  private initializeBoardState(): Map<number, Checker> {
    let checkerPosition: Position;
    let boardState: Map<number, Checker> = new Map();
    let checker: Checker;

    for (let row = 0; row < this.board.size.rows; row++) {
      for (let col = 0; col < this.board.size.cols; col++) {
        let cell = this.board.getCellValue(row, col);
        if (cell) {
          checkerPosition = { row, col };
          checker = this.buildChecker(cell.checkerId, cell.playerId, checkerPosition);
          console.log(cell.checkerId);
          console.log(JSON.stringify(checker));
          boardState.set(cell.checkerId, checker);
        }
      }
    }
    return boardState;
  }
  
  private buildChecker = (checkerId: number, playerId: number, position: Position) => {
    let direction: string;
    // this could be done much better
    if (playerId === 1) {
      direction = Direction.FORWORD;
    } else {
      direction = Direction.BACKWARD;
    }
    return { checkerId, playerId, position, direction };
  }
}
export default Game;