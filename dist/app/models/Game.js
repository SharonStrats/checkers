"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Board_1 = require("./Board");
var defaultOptions_1 = require("../config/defaultOptions");
var Direction_1 = require("../enums/Direction");
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
var Game = /** @class */ (function () {
    function Game(boardDimensions, players, numOfCheckersPerPlayer) {
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        this.buildChecker = function (checkerId, playerId, position) {
            var direction;
            // this could be done much better
            if (playerId === 1) {
                direction = Direction_1.Direction.FORWORD;
            }
            else {
                direction = Direction_1.Direction.BACKWARD;
            }
            return { checkerId: checkerId, playerId: playerId, position: position, direction: direction };
        };
        this._board = new Board_1.Board(boardDimensions, players.length, numOfCheckersPerPlayer);
        this._players = players;
        this._boardState = this.initializeBoardState();
        this._checkerState = new Map();
    }
    Object.defineProperty(Game.prototype, "board", {
        get: function () { return this._board; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "players", {
        get: function () { return this._players; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "boardState", {
        get: function () { return this._boardState; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "checkerState", {
        get: function () { return this._checkerState; },
        enumerable: false,
        configurable: true
    });
    Game.prototype.initializeBoardState = function () {
        var checkerPosition;
        var boardState = new Map();
        var checker;
        var cell;
        for (var row = 0; row < this.board.size.rows; row++) {
            for (var col = 0; col < this.board.size.cols; col++) {
                cell = this.board.getCellValue(row, col);
                if (cell) {
                    checkerPosition = { row: row, col: col };
                    checker = this.buildChecker(cell.checkerId, cell.playerId, checkerPosition);
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
