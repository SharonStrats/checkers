"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __importDefault(require("../../src/models/Game"));
describe('Game', function () {
    test('it should create an empty game', function () {
        var game = new Game_1.default(board, players, boardState, checkerState);
        console.log('it works');
    });
});
