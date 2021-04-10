"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Board_1 = require("./Board");
var defaultOptions_1 = require("../config/defaultOptions");
var initializationHelper_1 = require("../helpers/initializationHelper");
Object.freeze({
    FORWORD: 'forward',
    BACKWARD: 'backward'
});
var Game = /** @class */ (function () {
    function Game(boardDimensions, players, boardState, checkerState, numOfCheckersPerPlayer) {
        var _this = this;
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        this.initializeCheckerStatus = function (boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
            var checkers = [];
            var numOfCheckers = numOfPlayers * numOfCheckersPerPlayer;
            var checker;
            var row = 0;
            var col = 0;
            var checkerPosition = { row: row, col: col };
            var skipRows = false;
            var direction = 'forward';
            var player = 1;
            for (var i = 0; i < numOfCheckers; i++) {
                checker = _this.buildChecker(player, checkerPosition, direction);
                if (i === numOfCheckersPerPlayer - 1) {
                    skipRows = true;
                    checkerPosition = _this.nextBoardPosition(boardDimensions, checkerPosition, skipRows);
                    skipRows = false;
                    player++;
                    direction = 'backward';
                }
                else {
                    checkerPosition = _this.nextBoardPosition(boardDimensions, checkerPosition, skipRows);
                }
                checkers[i] = checker;
            }
            return checkers;
        };
        this.nextBoardPosition = function (boardDimensions, curCheckerPosition, skipRows) {
            var newCol = curCheckerPosition.col;
            var newRow = curCheckerPosition.row;
            if (skipRows) {
                newRow += initializationHelper_1.numOfRowsToSkip();
            }
            newCol += 2;
            if (newCol >= boardDimensions.cols) {
                newRow++;
                if (newRow % 2 === 0) { // even row
                    newCol = 0;
                }
                else { // odd row
                    newCol = 1;
                }
            }
            return { row: newRow, col: newCol };
        };
        this.buildChecker = function (playerId, position, direction) {
            return { playerId: playerId, position: position, direction: direction };
        };
        this.board = new Board_1.Board(boardDimensions, defaultOptions_1.NUM_OF_PLAYERS, defaultOptions_1.CHECKERS_PER_PLAYER);
        this.players = players;
        this.boardState = this.initializeCheckerStatus(boardDimensions, players.length, numOfCheckersPerPlayer);
        this.checkerState = checkerState;
    }
    return Game;
}());
exports.Game = Game;
exports.default = Game;
