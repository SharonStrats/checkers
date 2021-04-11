"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var defaultOptions_1 = require("../config/defaultOptions");
var Status_1 = require("../enums/Status");
var initializationHelper_1 = require("../helpers/initializationHelper");
// BOARD DECISIONS: I thought about putting a string 'empty' for a spot the player
//                  could move, but this made the data structure a bit too much
//                  probably a better way, but I decided to go with a BoardCell
//                  with playerId: 0 and checkerId: 0 to represent an empty location
var Board = /** @class */ (function () {
    function Board(boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfPlayers === void 0) { numOfPlayers = defaultOptions_1.NUM_OF_PLAYERS; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        this._board = [];
        this._board = this.initializeBoard(boardDimensions, numOfPlayers, numOfCheckersPerPlayer);
    }
    Object.defineProperty(Board.prototype, "size", {
        get: function () { return { rows: this._board.length, cols: this._board[0].length }; },
        enumerable: false,
        configurable: true
    });
    Board.prototype.getCellValue = function (row, col) {
        //if (this._board[row][col] === null) {
        // first had it throwing an error, but decided to return
        // an error string instead, this broke the initialization
        // ... just taking it out now but would refactor later
        //return BoardError.SpaceNotValid;
        //}
        return this._board[row][col];
    };
    Board.prototype.setCellValue = function (row, col, newValue) {
        if (this._board[row][col] === null) {
            return Status_1.Status.FAIL; // this could be better... more specific..
        }
        this._board[row][col] = newValue;
        return Status_1.Status.SUCCESS;
    };
    Board.prototype.initializeBoard = function (boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfPlayers === void 0) { numOfPlayers = defaultOptions_1.NUM_OF_PLAYERS; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        var newBoard = [];
        var playerId = 1;
        var checkerId = 1;
        var skipRow = false;
        var rowsToSkip = initializationHelper_1.numOfRowsToSkip(boardDimensions, numOfPlayers, numOfCheckersPerPlayer);
        var checkersInEachRow = 4; // need to calculate this.
        // if row is odd, marker should be place on even cols
        // if row is even, marker should be placed on odd cols
        for (var row = 0; row < boardDimensions.rows; row++) {
            var newRow = this.createBoardRow(boardDimensions, row, playerId, checkerId, checkersInEachRow, skipRow);
            newBoard[row] = newRow;
            if (!skipRow) {
                checkerId += checkersInEachRow;
            }
            if ((checkerId === numOfCheckersPerPlayer + 1) && !skipRow) {
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
        var boardCell = (!skipRow) ? { playerId: playerId, checkerId: checkerId } : { playerId: 0, checkerId: 0 };
        for (var col = 0; col < boardDimensions.cols; col++) {
            if ((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) { // even row odd cols || odd row even cols
                newRow[col] = boardCell;
                checkerId++;
                if (!skipRow) {
                    boardCell = this.buildBoardCell(playerId, checkerId);
                }
            }
            else {
                newRow[col] = null;
            }
        }
        return newRow;
    };
    Board.prototype.buildBoardCell = function (player, checker) {
        return { playerId: player, checkerId: checker };
    };
    return Board;
}());
exports.Board = Board;
