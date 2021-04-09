"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var defaultOptions_1 = require("../config/defaultOptions");
var Game = /** @class */ (function () {
    function Game(board, players, boardState, checkerState) {
        if (board === void 0) { board = defaultOptions_1.BOARD_DEFAULT; }
        // initialize boardState
        this.board = board;
        this.players = players;
        this.boardState = boardState;
        this.checkerState = checkerState;
    }
    return Game;
}());
exports.Game = Game;
exports.default = Game;
