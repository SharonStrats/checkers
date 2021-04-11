"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardError = exports.GameControlError = void 0;
var GameControlError;
(function (GameControlError) {
    GameControlError["SpaceOccupied"] = "Invalid move: space occupied";
    GameControlError["NotForward"] = "Invalid Move: not moving forward";
    GameControlError["NotOneSpace"] = "Invalid Move: more than one space";
})(GameControlError = exports.GameControlError || (exports.GameControlError = {}));
var BoardError;
(function (BoardError) {
    BoardError["SpaceNotValid"] = "Invalid Space: not a valid space to set";
})(BoardError = exports.BoardError || (exports.BoardError = {}));
