"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numOfRowsToSkip = void 0;
// calculate
var numOfRowsToSkip = function (boardDimensions, numOfPlayers, numOfCheckersPerPlayer) {
    var numberOfCheckersPerRow = boardDimensions.cols / 2;
    var totalNumberOfCheckersToPlace = numOfPlayers * numOfCheckersPerPlayer;
    return boardDimensions.rows - (totalNumberOfCheckersToPlace / numberOfCheckersPerRow);
};
exports.numOfRowsToSkip = numOfRowsToSkip;
