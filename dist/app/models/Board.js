"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var defaultOptions_1 = require("../config/defaultOptions");
var initializationHelper_1 = require("../helpers/initializationHelper");
var Board = /** @class */ (function () {
    function Board(boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfPlayers === void 0) { numOfPlayers = defaultOptions_1.NUM_OF_PLAYERS; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        this.board = [];
        this.board = this.initializeBoard(boardDimensions, numOfPlayers, numOfCheckersPerPlayer);
    }
    Board.prototype.initializeBoard = function (boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfPlayers === void 0) { numOfPlayers = defaultOptions_1.NUM_OF_PLAYERS; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        var newBoard = [];
        var playerId = 1;
        var checkerId = 1;
        var skipRow = false;
        var rowsToSkip = initializationHelper_1.numOfRowsToSkip();
        var checkersInEachRow = 4; // need to calculate this.
        // if row is odd, marker should be place on even cols
        // if row is even, marker should be placed on odd cols
        for (var row = 0; row < boardDimensions.rows; row++) {
            var newRow = this.createBoardRow(boardDimensions, row, playerId, checkerId, checkersInEachRow, skipRow);
            newBoard[row] = newRow;
            console.log("new Row 1 " + newRow);
            if (!skipRow) {
                checkerId += checkersInEachRow;
            }
            if (checkerId === numOfCheckersPerPlayer + 1) {
                playerId++;
                skipRow = true;
            }
            if (skipRow && rowsToSkip > 0) {
                rowsToSkip--;
            }
            else {
                skipRow = false;
            }
        }
        return newBoard;
    };
    Board.prototype.createBoardRow = function (boardDimensions, row, playerId, checkerId, checkersInEachRow, skipRow) {
        var newRow = [];
        var boardCell = { playerId: playerId, checkerId: checkerId };
        for (var col = 0; col < boardDimensions.cols; col++) {
            if (((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) && !skipRow) { // even row odd cols || odd row even cols
                newRow[col] = boardCell;
                checkerId++;
            }
            else {
                newRow[col] = null;
            }
            boardCell = this.buildBoardCell(playerId, checkerId);
        }
        return newRow;
    };
    Board.prototype.buildBoardCell = function (player, checker) {
        return { playerId: player, checkerId: checker };
    };
    return Board;
}());
exports.Board = Board;
