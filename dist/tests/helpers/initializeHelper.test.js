"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = require("../../app/config/defaultOptions");
var initializationHelper_1 = require("../../app/helpers/initializationHelper");
describe('initialize helper', function () {
    describe('numOfRowsToSkip', function () {
        test('Should return 2 for a typical default board, players, and number of checkers', function () {
            expect(initializationHelper_1.numOfRowsToSkip(defaultOptions_1.BOARD_DEFAULT, defaultOptions_1.NUM_OF_PLAYERS, defaultOptions_1.CHECKERS_PER_PLAYER)).toBe(2);
        });
    });
});
