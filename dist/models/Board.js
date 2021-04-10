"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var defaultOptions_1 = require("../config/defaultOptions");
var Board = /** @class */ (function () {
    function Board(boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
        var _this = this;
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfPlayers === void 0) { numOfPlayers = defaultOptions_1.NUM_OF_PLAYERS; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        this.initializeBoard = function (boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
            if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
            if (numOfPlayers === void 0) { numOfPlayers = defaultOptions_1.NUM_OF_PLAYERS; }
            if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
            var board = [];
            var playerId = 1;
            var checkerId = 1;
            var boardCell = { playerId: playerId, checkerId: checkerId };
            var skipRows = false;
            var numOfSkipRows = _this.numOfRowsToSkip();
            // if row is odd, marker should be place on even cols
            // if row is even, marker should be placed on odd cols
            for (var row = 0; row < boardDimensions.rows; row++) {
                for (var col = 0; col < boardDimensions.cols; col++) {
                    if (((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) && !skipRows) { // even row odd cols || odd row even cols
                        board[row][col] = boardCell;
                        checkerId++;
                    }
                    else {
                        board[row][col] = null;
                    }
                    if ((checkerId === numOfCheckersPerPlayer) && !skipRows) {
                        playerId++;
                        skipRows = true;
                    }
                    else if ((checkerId === numOfCheckersPerPlayer) && skipRows) {
                        numOfSkipRows--;
                    }
                    boardCell = _this.buildBoardCell(playerId, checkerId);
                }
                if (skipRows && (numOfSkipRows === 0)) {
                    skipRows = false;
                }
            }
            return board;
        };
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
        this.createPosition = function (row, col) {
            return { row: row, col: col };
        };
        this.numOfRowsToSkip = function () {
            return 2;
        };
        this.nextBoardPosition = function (boardDimensions, curCheckerPosition, skipRows) {
            var newCol = curCheckerPosition.col;
            var newRow = curCheckerPosition.row;
            if (skipRows) {
                newRow += _this.numOfRowsToSkip();
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
        this.board = this.initializeBoard(boardDimensions, numOfPlayers, numOfCheckersPerPlayer);
    }
    Board.prototype.buildBoardCell = function (player, checker) {
        return { playerId: player, checkerId: checker };
    };
    return Board;
}());
exports.Board = Board;
