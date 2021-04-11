import { GameController } from "../../app/controllers/GameController";
import Game from "../../app/models/Game";
import { Player } from "../../app/models/Player";
import { BOARD_DEFAULT } from '../../app/config/defaultOptions';
import { Position } from '../../app/models/Position';
import { Checker } from '../../app/models/Checker';
import { Status } from "../../app/enums/Status";

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

  const players = [ player1, player2 ];
  let checkerBoard = new Game(boardDimensions, [ player1, player2])
  let game = new GameController(checkerBoard);

  describe('move', () => {
    let position:Position = { row: 3, col: 2};
    let checker: Checker | undefined = checkerBoard.boardState.get(1);
    if (checker) {
      expect(game.move(checker,position)).toBe(Status.SUCCESS);
    }
  });

});