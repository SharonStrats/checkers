import Game from "./app/models/Game";
import { Player } from './app/models/Player';
import { GameController } from './app/controllers/GameController';
import { Checker, CheckerState } from './app/models/Checker';
import { Position } from './app/models/Position';

let player1: Player = {
  id: 1,
  name: 'Sharon'
};
let player2: Player = {
  id: 2,
  name: 'Dimitri'
};

let boardState: Checker[] = [];
let checkerState: CheckerState[] = [];

let checkerBoard = new Game({ rows: 8, cols: 8}, [ player1, player2])
console.log(JSON.stringify(checkerBoard.board));
let game = new GameController(checkerBoard);
let position:Position = { row: 3, col: 2};
let checker: Checker | undefined = checkerBoard.boardState.get(1);
if (checker) {
  let moveStatus = game.move(checker,position);
  console.log(moveStatus);
}
console.log(JSON.stringify(checkerBoard.board));
