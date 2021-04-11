"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Direction = void 0;
var Board_1 = require("./Board");
var defaultOptions_1 = require("../config/defaultOptions");
exports.Direction = Object.freeze({
    FORWORD: 'forward',
    BACKWARD: 'backward'
});
var Game = /** @class */ (function () {
    function Game(boardDimensions, players, boardState, checkerState, numOfCheckersPerPlayer) {
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        this.buildChecker = function (checkerId, playerId, position) {
            var direction;
            // this could be done much better
            if (playerId === 1) {
                direction = exports.Direction.FORWORD;
            }
            else {
                direction = exports.Direction.BACKWARD;
            }
            return { checkerId: checkerId, playerId: playerId, position: position, direction: direction };
        };
        this.board = new Board_1.Board(boardDimensions, defaultOptions_1.NUM_OF_PLAYERS, defaultOptions_1.CHECKERS_PER_PLAYER);
        this.players = players;
        this.boardState = this.initializeBoardState();
        this.checkerState = checkerState;
    }
    Game.prototype.initializeBoardState = function () {
        var checkerPosition;
        var boardState = new Map();
        var checker;
        for (var row = 0; row < this.board.size.rows; row++) {
            for (var col = 0; col < this.board.size.cols; col++) {
                var cell = this.board.getCellValue(row, col);
                if (cell) {
                    checkerPosition = { row: row, col: col };
                    checker = this.buildChecker(cell.checkerId, cell.playerId, checkerPosition);
                    console.log(cell.checkerId);
                    console.log(JSON.stringify(checker));
                    boardState.set(cell.checkerId, checker);
                }
            }
        }
        return boardState;
    };
    return Game;
}());
exports.Game = Game;
exports.default = Game;
