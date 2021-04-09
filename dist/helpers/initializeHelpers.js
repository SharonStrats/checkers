"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRow = void 0;
var initializeRow = function (boardState, row, player, numOfCols, alternateRow) {
    for (var j = 1; j < numOfCols; j + 2) {
        if (!alternateRow) {
            boardState[row][j] = 0;
            boardState[row][j + 1] = player;
        }
        else {
            boardState[row][j] = player;
            boardState[row][j + 1] = 0;
        }
    }
    return boardState;
};
exports.initializeRow = initializeRow;
