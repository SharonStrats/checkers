"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __importDefault(require("./app/models/Game"));
var GameController_1 = require("./app/controllers/GameController");
var player1 = {
    id: 1,
    name: 'Sharon'
};
var player2 = {
    id: 2,
    name: 'Dimitri'
};
var boardState = [];
var checkerState = [];
var checkerBoard = new Game_1.default({ rows: 8, cols: 8 }, [player1, player2], boardState, checkerState);
console.log(JSON.stringify(checkerBoard.board));
var game = new GameController_1.GameController(checkerBoard);
var position = { row: 3, col: 2 };
var checker = checkerBoard.boardState.get(1);
if (checker) {
    var moveStatus = game.move(checker, position);
    console.log(moveStatus);
}
console.log(JSON.stringify(checkerBoard.board));
