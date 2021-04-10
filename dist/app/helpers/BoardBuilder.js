"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardBuilder = void 0;
var Board_1 = require("../models/Board");
var BoardRow = /** @class */ (function () {
    function BoardRow() {
        this.row = [];
        var data = { playerId: 1, checkerId: 1 };
    }
    return BoardRow;
}());
var BoardBuilder = /** @class */ (function () {
    function BoardBuilder(board) {
        if (board === void 0) { board = []; }
        this.board = new Board_1.Board();
    }
    BoardBuilder.prototype.addRowFluent = function (boardDimensions, playerId, checkerId) {
        var row = new BoardRow();
        this.board.createBoardRow(boardDimensions, 0, 1, 1);
        console.log('this ' + JSON.stringify(this));
        return this;
    };
    BoardBuilder.prototype.build = function () {
        return this.board;
    };
    return BoardBuilder;
}());
exports.BoardBuilder = BoardBuilder;
