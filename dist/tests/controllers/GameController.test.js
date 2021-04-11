"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameController_1 = require("../../app/controllers/GameController");
var Game_1 = __importDefault(require("../../app/models/Game"));
var defaultOptions_1 = require("../../app/config/defaultOptions");
var Status_1 = require("../../app/enums/Status");
var Error_1 = require("../../app/enums/Error");
var Direction_1 = require("../../app/enums/Direction");
describe('GameController', function () {
    var boardDimensions = defaultOptions_1.BOARD_DEFAULT;
    var player1 = {
        id: 1,
        name: 'Sharon'
    };
    var player2 = {
        id: 2,
        name: 'Dimitri'
    };
    describe('move', function () {
        beforeAll(function () {
        });
        test('Should be success (diagonal move) forward moving checker', function () {
            var players = [player1, player2];
            var checkerBoard = new Game_1.default(boardDimensions, [player1, player2]);
            var game = new GameController_1.GameController(checkerBoard);
            var position = { row: 4, col: 1 };
            var checker = {
                checkerId: 1,
                playerId: 1,
                position: { row: 3, col: 0 },
                direction: Direction_1.Direction.FORWORD
            };
            expect(game.move(checker, position)).toBe(Status_1.Status.SUCCESS);
        });
        test('Should be success (diagonal move) backward moving checker', function () {
            var players = [player1, player2];
            var checkerBoard = new Game_1.default(boardDimensions, [player1, player2]);
            var game = new GameController_1.GameController(checkerBoard);
            var position = { row: 4, col: 3 };
            var checker = {
                checkerId: 1,
                playerId: 1,
                position: { row: 5, col: 2 },
                direction: Direction_1.Direction.BACKWARD
            };
            expect(game.move(checker, position)).toBe(Status_1.Status.SUCCESS);
        });
        test('Should return space not valid', function () {
            var players = [player1, player2];
            var checkerBoard = new Game_1.default(boardDimensions, [player1, player2]);
            var game = new GameController_1.GameController(checkerBoard);
            var position = { row: 0, col: 0 };
            var checker = {
                checkerId: 1,
                playerId: 1,
                position: { row: 0, col: 1 },
                direction: Direction_1.Direction.FORWORD
            };
            expect(game.move(checker, position)).toBe(Error_1.BoardError.SpaceNotValid);
        });
        test('Should return not a forward move (forward moving piece)', function () {
            var players = [player1, player2];
            var checkerBoard = new Game_1.default(boardDimensions, [player1, player2]);
            var game = new GameController_1.GameController(checkerBoard);
            var position = { row: 3, col: 0 };
            var checker = {
                checkerId: 1,
                playerId: 1,
                position: { row: 4, col: 1 },
                direction: Direction_1.Direction.FORWORD
            };
            expect(game.move(checker, position)).toBe(Error_1.GameControlError.NotForward);
        });
        test('Should return not a forward move (backward moving piece)', function () {
            var players = [player1, player2];
            var checkerBoard = new Game_1.default(boardDimensions, [player1, player2]);
            var game = new GameController_1.GameController(checkerBoard);
            var position = { row: 4, col: 7 };
            var checker = {
                checkerId: 1,
                playerId: 1,
                position: { row: 3, col: 6 },
                direction: Direction_1.Direction.BACKWARD
            };
            expect(game.move(checker, position)).toBe(Error_1.GameControlError.NotForward);
        });
    });
});
