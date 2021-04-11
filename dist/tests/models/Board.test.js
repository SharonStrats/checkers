"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = require("../../app/config/defaultOptions");
var Error_1 = require("../../app/enums/Error");
var Board_1 = require("../../app/models/Board");
describe('Board', function () {
    var boardDimensions = defaultOptions_1.BOARD_DEFAULT;
    var sizeResult = { rows: 8, cols: 8 };
    var board = new Board_1.Board();
    var emptyCell = { playerId: 0, checkerId: 0 };
    test('Returns a Board', function () {
        //expect(board).toMatchObject(Board);
    });
    test('Invalid cells row 0', function () {
        expect(board.getCellValue(0, 0)).toBe(null);
        expect(board.getCellValue(0, 2)).toBe(null);
        expect(board.getCellValue(0, 4)).toBe(null);
        expect(board.getCellValue(0, 6)).toBe(null);
    });
    test('Invalid cells row 1', function () {
        expect(board.getCellValue(1, 1)).toBe(null);
        expect(board.getCellValue(1, 3)).toBe(null);
        expect(board.getCellValue(1, 5)).toBe(null);
        expect(board.getCellValue(1, 7)).toBe(null);
    });
    test('Empty cells row 3', function () {
        expect(board.getCellValue(3, 0)).toEqual(emptyCell);
        expect(board.getCellValue(3, 2)).toEqual(emptyCell);
        expect(board.getCellValue(3, 4)).toEqual(emptyCell);
        expect(board.getCellValue(3, 6)).toEqual(emptyCell);
    });
    test('Empty cells row 4', function () {
        expect(board.getCellValue(4, 1)).toEqual(emptyCell);
        expect(board.getCellValue(4, 3)).toEqual(emptyCell);
        expect(board.getCellValue(4, 5)).toEqual(emptyCell);
        expect(board.getCellValue(4, 7)).toEqual(emptyCell);
    });
    describe('getter size', function () {
        var boardDimensions = defaultOptions_1.BOARD_DEFAULT;
        var sizeResult = { rows: 8, cols: 8 };
        var board = new Board_1.Board(boardDimensions);
        test('given an 8 * 8 dimension size returns an object with 8 rows and 8 cols', function () {
            expect(board.size).toEqual(sizeResult);
        });
    });
    describe('getCellValue and setCellValue test', function () {
        var boardDimensions = defaultOptions_1.BOARD_DEFAULT;
        var sizeResult = { rows: 8, cols: 8 };
        var board = new Board_1.Board(boardDimensions);
        var cell = { playerId: 3, checkerId: 50 };
        test('after setting a value on a board cell the value is retrieved', function () {
            board.setCellValue(0, 1, cell);
            expect(board.getCellValue(0, 1)).toBe(cell);
        });
        test('setCellValue throws error when trying to set an invalid space', function () {
            try {
                board.setCellValue(0, 0, cell);
            }
            catch (error) {
                expect(error).toHaveProperty('message', Error_1.BoardError.SpaceNotValid);
            }
        });
        test('getCellValue throws error when trying to set an invalid space', function () {
            try {
                board.getCellValue(0, 0);
            }
            catch (error) {
                expect(error).toHaveProperty('message', Error_1.BoardError.SpaceNotValid);
            }
        });
    });
});
