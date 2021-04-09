import { BoardOptions } from '../models/Board';

export const BOARD_DEFAULT: BoardOptions = { rows: 8, cols: 8};
export const CHECKERS_PER_PLAYER: number = 12;
export const NUM_OF_PLAYERS: number = 2;
export const NUM_OF_BLANK_ROWS = BOARD_DEFAULT.rows - (((CHECKERS_PER_PLAYER * 2)/BOARD_DEFAULT.cols)* NUM_OF_PLAYERS)


