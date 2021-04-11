"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
var Error_1 = require("../enums/Error");
var Direction_1 = require("../enums/Direction");
var Status_1 = require("../enums/Status");
//import { Move } from '../enums/Move';
// Note: should put index.ts file in enums, would be cleaner and then import all from 
//       same place instead of so many imports.
/*  GameController
*     game: Game
*     Takes a Game and Wraps it in a controller in order to perform the game.
*/
var GameController = /** @class */ (function () {
    function GameController(game) {
        this.game = game;
    }
    // Note: I changed my mind about throwing errors, but going 
    // to still use the error enum would refactor later.
    GameController.prototype.move = function (checkerToMove, positionTo) {
        var spaceOccupied = this.spaceOccupied(positionTo);
        if (spaceOccupied) {
            return spaceOccupied;
        }
        if (!this.forwardMoveForPlayer(checkerToMove, positionTo)) {
            return Error_1.GameControlError.NotForward;
        }
        if (this.spacesToMove(checkerToMove, positionTo) > 1) {
            return Error_1.GameControlError.NotOneSpace;
        }
        return this.processMove(checkerToMove, positionTo);
    };
    GameController.prototype.spaceOccupied = function (position) {
        var cell = this.game.board.getCellValue(position.row, position.col);
        if (cell) {
            return (cell.playerId !== 0) ? Error_1.GameControlError.SpaceOccupied : false;
        }
        return Error_1.BoardError.SpaceNotValid;
    };
    GameController.prototype.forwardMoveForPlayer = function (checker, positionTo) {
        if (checker.direction === Direction_1.Direction.FORWORD) {
            return (checker.position.row < positionTo.row) ? true : false;
        }
        else {
            return (checker.position.row > positionTo.row) ? true : false;
        }
    };
    // need to finish implementing
    GameController.prototype.spacesToMove = function (checker, positionTo) {
        return 1;
    };
    GameController.prototype.processMove = function (checker, positionTo) {
        var cell = { playerId: checker.playerId, checkerId: checker.checkerId };
        var moveStatus;
        moveStatus = this.game.board.setCellValue(checker.position.row, checker.position.col, null);
        if (moveStatus === Status_1.Status.SUCCESS) {
            moveStatus = this.game.board.setCellValue(positionTo.row, positionTo.col, cell);
        }
        return moveStatus;
    };
    // can create a State Snapshots to record all the states
    // in order to rollback later..
    GameController.prototype.saveState = function () {
    };
    return GameController;
}());
exports.GameController = GameController;
