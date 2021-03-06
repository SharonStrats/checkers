import Game from "../../app/models/Game";
import { BOARD_DEFAULT } from '../../app/config/defaultOptions';
import { Player } from '../../app/models/Player';

describe('Game', () => {
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
  test('it should create an empty game', () => {
    let game = new Game(boardDimensions, players);
    expect(game.board.size.rows).toBe(8);
    expect(game.board.size.cols).toBe(8);
    expect(new Game(boardDimensions, players)).toBeInstanceOf(Game);
  });
  // TODO: need to test that the boardStatus is created correctly
});