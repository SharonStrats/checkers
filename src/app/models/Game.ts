import { Player } from './Player';
import { Board, BoardCell, BoardOptions } from './Board';
import { BOARD_DEFAULT, NUM_OF_PLAYERS, CHECKERS_PER_PLAYER } from '../config/defaultOptions';
import { Direction } from '../enums/Direction';
import { Checker, CheckerState } from './Checker';
import { Position } from './Position';
import { BoardError } from '../enums/Error';

/* Game
*   board
*   players
*   boardState
*   checkerState
*   Initializes a Game of Checkers, the default is an 8 * 8 board with 2 players.
*   Notes: Decided to use Maps for boardState for quick look up
*          Did the same for checkerState, not only for quick look up, but no need
*          to store all the checkers, only need to store the ones that are kinged.
*/
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
  get players() { return this._players; } 
  get boardState() { return this._boardState; } 
  get checkerState() { return this._checkerState; } 

  private initializeBoardState(): Map<number, Checker> {
    let checkerPosition: Position;
    let boardState: Map<number, Checker> = new Map();
    let checker: Checker;
    let cell: BoardCell | null ;

    for (let row = 0; row < this.board.size.rows; row++) {
      for (let col = 0; col < this.board.size.cols; col++) {
        cell = this.board.getCellValue(row, col);
        if (cell) {
          checkerPosition = { row, col };
          checker = this.buildChecker(cell.checkerId, cell.playerId, checkerPosition);
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