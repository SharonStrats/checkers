import { GameController } from "../../app/controllers/GameController";
import Game from "../../app/models/Game";
import { Player } from "../../app/models/Player";
import { BOARD_DEFAULT } from '../../app/config/defaultOptions';
import { Position } from '../../app/models/Position';
import { Checker } from '../../app/models/Checker';
import { Status } from "../../app/enums/Status";
import { BoardError, GameControlError } from '../../app/enums/Error';
import { Direction } from "../../app/enums/Direction";

describe('GameController', () => {
  const boardDimensions = BOARD_DEFAULT;
  const player1: Player = {
    id: 1,
    name: 'Sharon'
  };
  const player2: Player = {
    id: 2,
    name: 'Dimitri'
  };


  describe('move', () => {
    beforeAll(() => {
      
    });
    test('Should be success (diagonal move) forward moving checker', () => {
      const players = [ player1, player2 ];
      let checkerBoard = new Game(boardDimensions, [ player1, player2])
      let game = new GameController(checkerBoard);

      let position:Position = { row: 4, col: 1};
      let checker: Checker = {
        checkerId: 1,
        playerId: 1,
        position: { row: 3, col: 0 },
        direction: Direction.FORWORD
      }
      expect(game.move(checker,position)).toBe(Status.SUCCESS);
    });
    test('Should be success (diagonal move) backward moving checker', () => {
      const players = [ player1, player2 ];
      let checkerBoard = new Game(boardDimensions, [ player1, player2])
      let game = new GameController(checkerBoard);

      let position:Position = { row: 4, col: 3};
      let checker: Checker = {
        checkerId: 1,
        playerId: 1,
        position: { row: 5, col: 2 },
        direction: Direction.BACKWARD
      }
      expect(game.move(checker,position)).toBe(Status.SUCCESS);
    });
    test('Should return space not valid', () => {const players = [ player1, player2 ];
      let checkerBoard = new Game(boardDimensions, [ player1, player2])
      let game = new GameController(checkerBoard);

      let position:Position = { row: 0, col: 0};
      let checker: Checker = {
        checkerId: 1,
        playerId: 1,
        position: { row: 0, col: 1 },
        direction: Direction.FORWORD
      }
      expect(game.move(checker,position)).toBe(BoardError.SpaceNotValid);
    });
    test('Should return not a forward move (forward moving piece)', () => {
      const players = [ player1, player2 ];
      let checkerBoard = new Game(boardDimensions, [ player1, player2])
      let game = new GameController(checkerBoard);

      let position:Position = { row: 3, col: 0};
      let checker: Checker = {
        checkerId: 1,
        playerId: 1,
        position: { row: 4, col: 1 },
        direction: Direction.FORWORD
      }
      expect(game.move(checker,position)).toBe(GameControlError.NotForward);
    });
    test('Should return not a forward move (backward moving piece)', () => {
      const players = [ player1, player2 ];
      let checkerBoard = new Game(boardDimensions, [ player1, player2])
      let game = new GameController(checkerBoard);
      
      let position:Position = { row: 4, col: 7};
      let checker: Checker = {
        checkerId: 1,
        playerId: 1,
        position: { row: 3, col: 6 },
        direction: Direction.BACKWARD
      }
      expect(game.move(checker,position)).toBe(GameControlError.NotForward);
    });
  });

});