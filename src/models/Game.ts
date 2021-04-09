
import { Player } from './Player';
import { BoardOptions } from './Board';
import { BOARD_DEFAULT } from '../config/defaultOptions';

Object.freeze({
  FORWORD: 'forward',
  BACKWARD: 'backward'
});

export interface Position {
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
  board: BoardOptions;
  players: Player[];
  boardState: Checker[];
  checkerState: CheckerState[];

  constructor(board: BoardOptions = BOARD_DEFAULT, players: Player[], boardState: Checker[], checkerState: CheckerState[]) {
    this.board = board;
    this.players = players;
    this.boardState = boardState;
    this.checkerState = checkerState;
  }
}
export default Game;