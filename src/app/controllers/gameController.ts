import { Game } from "../models/Game";
import { BoardCell } from '../models/Board';
import { Checker } from '../models/Checker';
import { Position } from '../models/Position';
import { BoardError, GameControlError } from '../enums/Error';
import { Direction } from '../enums/Direction';
import { Status } from "../enums/Status";
//import { Move } from '../enums/Move';
// Note: should put index.ts file in enums, would be cleaner and then import all from 
//       same place instead of so many imports.

/*  GameController
*     game: Game
*     Takes a Game and Wraps it in a controller in order to perform the game. 
*/
export class GameController {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  // Note: I changed my mind about throwing errors, but going 
  // to still use the error enum would refactor later.
  public move(checkerToMove: Checker, positionTo: Position) {
 
    const spaceOccupied = this.spaceOccupied(positionTo); 

    if (spaceOccupied) {
      return spaceOccupied;
    }
    if (!this.forwardMoveForPlayer(checkerToMove, positionTo)) {
      return GameControlError.NotForward;
    }
    if (this.moreThanOneSpace(checkerToMove, positionTo)) {
      return GameControlError.NotOneSpace;
    }

      return this.processMove(checkerToMove, positionTo);
  }

  private spaceOccupied(position: Position) {

    let cell: BoardCell | null = this.game.board.getCellValue(position.row, position.col);
    if (cell) {
      return (cell.playerId !== 0) ? GameControlError.SpaceOccupied : false;
    }
    return BoardError.SpaceNotValid;
  }

  private forwardMoveForPlayer(checker: Checker, positionTo: Position): boolean {
    if (checker.direction === Direction.FORWORD) {
      return (checker.position.row < positionTo.row) ? true : false;
    } else {
      return (checker.position.row > positionTo.row) ? true : false;
    }
  }

  // need to finish implementing
  private moreThanOneSpace(checker: Checker, positionTo: Position) {
    // using abs to account for both forward and backward moving players
    const numOfRowsToMove = Math.abs(positionTo.row - checker.position.row);  
    const numOfColsToMove = Math.abs( positionTo.col - checker.position.col) 
    if (numOfRowsToMove > 2 || numOfColsToMove > 1) {
      return GameControlError.NotOneSpace;
    }
    return false;
  }

  private processMove(checker: Checker, positionTo: Position) {
    const cell: BoardCell = { playerId: checker.playerId, checkerId: checker.checkerId} 
    let moveStatus: string;

    moveStatus = this.game.board.setCellValue(checker.position.row, checker.position.col, null);
    if (moveStatus === Status.SUCCESS) {
      moveStatus = this.game.board.setCellValue(positionTo.row, positionTo.col, cell);
    }
    return moveStatus;
  }

  // can create a State Snapshots to record all the states
  // in order to rollback later..
  private saveState() {

  }
}