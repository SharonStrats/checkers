"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __importDefault(require("../../app/models/Game"));
var defaultOptions_1 = require("../../app/config/defaultOptions");
describe('Game', function () {
    var boardDimensions = defaultOptions_1.BOARD_DEFAULT;
    var player1 = {
        id: 1,
        name: 'Sharon'
    };
    var player2 = {
        id: 2,
        name: 'Dimitri'
    };
    var players = [player1, player2];
    test('it should create an empty game', function () {
        var game = new Game_1.default(boardDimensions, players);
        expect(game.board.size.rows).toBe(8);
        expect(game.board.size.cols).toBe(8);
        expect(new Game_1.default(boardDimensions, players)).toBeInstanceOf(Game_1.default);
    });
    // TODO: need to test that the boardStatus is created correctly
});
