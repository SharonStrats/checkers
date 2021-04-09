"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createPosition = function (row, col) {
    return { row: row, col: col };
};
var _numOfRowsToSkip = function () {
    return 2;
};
var _nextBoardPosition = function (boardDimensions, curCheckerPosition, skipRows) {
    var newCol = curCheckerPosition.col;
    var newRow = curCheckerPosition.row;
    if (skipRows) {
        newRow += _numOfRowsToSkip();
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
var _buildChecker = function (playerId, position, direction) {
    return { playerId: playerId, position: position, direction: direction };
};
var initializeBoard = function (boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
    var board = [];
    var numOfCheckers = numOfPlayers * numOfCheckersPerPlayer;
    var checker;
    var row = 0;
    var col = 0;
    var checkerPosition = { row: row, col: col };
    var skipRows = false;
    var direction = 'forward';
    var player = 1;
    for (var i = 0; i < numOfCheckers; i++) {
        checker = _buildChecker(player, checkerPosition, direction);
        if (i === numOfCheckersPerPlayer - 1) {
            skipRows = true;
            checkerPosition = _nextBoardPosition(boardDimensions, checkerPosition, skipRows);
            skipRows = false;
            player++;
            direction = 'backward';
        }
        else {
            checkerPosition = _nextBoardPosition(boardDimensions, checkerPosition, skipRows);
        }
        board[i] = checker;
    }
    return board;
};
exports.default = initializeBoard;
