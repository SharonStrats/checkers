import { Game } from "../models/Game";
import { BoardCell } from '../models/Board';
import { Checker } from '../models/Checker';
import { Position } from '../models/Position';
import { GameControlError } from '../enums/Error';
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

  public move(checkerToMove: Checker, positionTo: Position) {
    try {
      if (this.spaceOccupied(positionTo)) {
        throw new Error(GameControlError.SpaceOccupied);
      }
    } catch (error)  {
      throw new Error(error);
    }

    if (!this.forwardMoveForPlayer(checkerToMove, positionTo)) {
      throw new Error(GameControlError.NotForward);
    }
    if (this.spacesToMove(checkerToMove, positionTo) > 1) {
      throw new Error(GameControlError.NotOneSpace);
    }

    return this.processMove(checkerToMove, positionTo);

  }

  private spaceOccupied(position: Position) {
    try {
      return this.game.board.getCellValue(position.row, position.col);
    } catch (error) {
      throw new Error(error);
    }
  }

  private forwardMoveForPlayer(checker: Checker, positionTo: Position): boolean {
    if (checker.direction === Direction.FORWORD) {
      return (checker.position.row < positionTo.row) ? true : false;
    } else {
      return (checker.position.row > positionTo.row) ? true : false;
    }
  }

  // need to finish implementing
  private spacesToMove(checker: Checker, positionTo: Position) {
    return 1;
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