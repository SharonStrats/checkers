"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
var Game_1 = require("../models/Game");
var Error = Object.freeze({
    SpaceOccupied: 'Invalid move: space occupied',
    NotForward: 'Invalid Move: not moving forward',
    NotOneSpace: 'Invalid Move: more than one space'
});
var Move = Object.freeze({
    Forward: 'forward',
    Diagonal: 'diagonal',
    Backward: 'backward' // only if king
});
var GameController = /** @class */ (function () {
    function GameController(game) {
        this.game = game;
    }
    GameController.prototype.move = function (checkerToMove, positionTo) {
        if (this.spaceOccupied(positionTo)) {
            return Error.SpaceOccupied;
        }
        if (!this.forwardMoveForPlayer(checkerToMove, positionTo)) {
            return Error.NotForward;
        }
        if (this.spacesToMove(checkerToMove, positionTo) > 1) {
            return Error.NotOneSpace;
        }
        return this.processMove(checkerToMove, positionTo);
    };
    GameController.prototype.spaceOccupied = function (position) {
        return this.game.board.getCellValue(position.row, position.col);
    };
    GameController.prototype.forwardMoveForPlayer = function (checker, positionTo) {
        if (checker.direction === Game_1.Direction.FORWORD) {
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
        if (moveStatus === "Success") {
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
