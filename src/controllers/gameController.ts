import { CHECKERS_PER_PLAYER, NUM_OF_PLAYERS } from '../config/defaultOptions';
import { BoardOptions } from '../models/Board';
import { Checker, Position } from '../models/Game';

const _createPosition = (row:number, col: number) => {
  return { row, col };
}
const _numOfRowsToSkip = () => {

  return 2;
}

const _nextBoardPosition = (boardDimensions: BoardOptions, curCheckerPosition: Position, skipRows: boolean) => {
  let newCol: number = curCheckerPosition.col;
  let newRow: number = curCheckerPosition.row;

  if (skipRows) {
    newRow += _numOfRowsToSkip();
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
const _buildChecker = (playerId: number, position: Position, direction: string) => {

  return { playerId, position, direction };
}
const initializeBoard = (boardDimensions: BoardOptions, numOfPlayers: number, numOfCheckersPerPlayer: number) => {
  let board: Checker[] = [];
  const numOfCheckers = numOfPlayers * numOfCheckersPerPlayer;
  let checker: Checker;
  let row: number = 0;
  let col: number = 0;
  let checkerPosition: Position = { row, col };
  let skipRows: boolean = false;
  let direction: string = 'forward';
  let player: number = 1;

  for (let i = 0; i < numOfCheckers; i++) {

    checker = _buildChecker(player, checkerPosition, direction);
    if (i === numOfCheckersPerPlayer - 1) {
      skipRows = true;
      checkerPosition = _nextBoardPosition(boardDimensions, checkerPosition, skipRows);
      skipRows = false;
      player++;
      direction = 'backward';
    } else {
      checkerPosition = _nextBoardPosition(boardDimensions, checkerPosition, skipRows);
    }

    board[i] = checker;
  }
  return board;
}

export default initializeBoard;