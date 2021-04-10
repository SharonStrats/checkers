import Game from "./app/models/Game";
import { Player } from './app/models/Player';
import { Checker, CheckerState } from './app/models/Game';
import  { Board } from './app/models/Board';

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

let checkerBoard = new Game({ rows: 8, cols: 8}, [ player1, player2], boardState, checkerState)
console.log(JSON.stringify(checkerBoard.board));
console.log(JSON.stringify(checkerBoard.boardState));