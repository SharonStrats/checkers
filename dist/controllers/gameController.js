"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeGame = void 0;
var defaultOptions_1 = require("../config/defaultOptions");
var initializeHelpers_1 = require("../helpers/initializeHelpers");
var initializeGame = function (game) {
    var boardState = [];
    var alternateRow = false;
    var player = game.players[0].id;
    var checkerCount = 0;
    for (var row = 1; row < game.board.rows; row++) {
        boardState = initializeHelpers_1.initializeRow(boardState, row, player, game.board.cols, alternateRow);
        checkerCount = checkerCount + (game.board.cols / defaultOptions_1.NUM_OF_PLAYERS); // places checkers on 1/2 the squares
        if (checkerCount === defaultOptions_1.CHECKERS_PER_PLAYER) {
            for (var i = 0; i < defaultOptions_1.NUM_OF_BLANK_ROWS; i++) {
                boardState = initializeHelpers_1.initializeRow(boardState, row, 0, game.board.cols, alternateRow);
            }
            // need to adjust this to handle more than 2 players
            player = game.players[1].id;
        }
    }
};
exports.initializeGame = initializeGame;
