import CheckerBoard from "./models/Game";
import { Player } from './models/Player';
import { Checker, CheckerState } from './models/Game';
import  initializeBoard  from './controllers/gameController';

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

let board = initializeBoard({ rows: 8, cols: 8}, 2, 12);
console.log(board);
let checkerBoard = new CheckerBoard({ rows: 8, cols: 8}, [ player1, player2], boardState, checkerState)
console.log(checkerBoard)