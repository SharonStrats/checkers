"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Board_1 = require("./Board");
var defaultOptions_1 = require("../config/defaultOptions");
Object.freeze({
    FORWORD: 'forward',
    BACKWARD: 'backward'
});
var Game = /** @class */ (function () {
    function Game(boardDimensions, players, boardState, checkerState, numOfCheckersPerPlayer) {
        if (boardDimensions === void 0) { boardDimensions = defaultOptions_1.BOARD_DEFAULT; }
        if (numOfCheckersPerPlayer === void 0) { numOfCheckersPerPlayer = defaultOptions_1.CHECKERS_PER_PLAYER; }
        /*
        private initializeCheckerStatus = (boardDimensions: BoardOptions, numOfPlayers: number, numOfCheckersPerPlayer: number) => {
          const checkers: Checker[] = [];
          const numOfCheckers = numOfPlayers * numOfCheckersPerPlayer;
          let checker: Checker;
          let row: number = 0;
          let col: number = 0;
          let checkerPosition: Position = { row, col };
          let skipRows: boolean = false;
          let direction: string = 'forward';
          let player: number = 1;
        
          for (let i = 0; i < numOfCheckers; i++) {
        
           checker = this.buildChecker(player, checkerPosition, direction);
            if (i === numOfCheckersPerPlayer - 1) {
              skipRows = true;
              checkerPosition = this.nextBoardPosition(boardDimensions, checkerPosition, skipRows);
              skipRows = false;
              player++;
              direction = 'backward';
            } else {
              checkerPosition = this.nextBoardPosition(boardDimensions, checkerPosition, skipRows);
            }
        
            checkers[i] = checker;
          }
          return checkers;
        }
      
       
        private nextBoardPosition = (boardDimensions: BoardOptions, curCheckerPosition: Position, skipRows: boolean) => {
          let newCol: number = curCheckerPosition.col;
          let newRow: number = curCheckerPosition.row;
        
          if (skipRows) {
            newRow += numOfRowsToSkip();
          }
        
          newCol += 2;
          if (newCol >= boardDimensions.cols) {
            newRow++;
            if (newRow%2 === 0) {  // even row
              newCol = 0;
            } else {  // odd row
              newCol = 1;
            }
          }
        
          return { row: newRow, col: newCol };
        }
        */
        this.buildChecker = function (playerId, position) {
            var direction;
            if (playerId === 1) {
                direction = 'forward';
            }
            else {
                direction = 'backward';
            }
            return { playerId: playerId, position: position, direction: direction };
        };
        this.board = new Board_1.Board(boardDimensions, defaultOptions_1.NUM_OF_PLAYERS, defaultOptions_1.CHECKERS_PER_PLAYER);
        this.players = players;
        this.boardState = this.initializeBoardState();
        this.checkerState = checkerState;
    }
    Game.prototype.initializeBoardState = function () {
        var checkerPosition;
        var boardState = new Map();
        var checker;
        for (var row = 0; row < this.board.size.rows; row++) {
            for (var col = 0; col < this.board.size.cols; col++) {
                var cell = this.board.getCellValue(row, col);
                if (cell) {
                    checkerPosition = { row: row, col: col };
                    checker = this.buildChecker(cell.playerId, checkerPosition);
                    console.log(cell.checkerId);
                    console.log(JSON.stringify(checker));
                    boardState.set(cell.checkerId, checker);
                }
            }
        }
        return boardState;
    };
    return Game;
}());
exports.Game = Game;
exports.default = Game;
