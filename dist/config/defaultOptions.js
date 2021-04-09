"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUM_OF_BLANK_ROWS = exports.NUM_OF_PLAYERS = exports.CHECKERS_PER_PLAYER = exports.BOARD_DEFAULT = void 0;
exports.BOARD_DEFAULT = { rows: 8, cols: 8 };
exports.CHECKERS_PER_PLAYER = 12;
exports.NUM_OF_PLAYERS = 2;
exports.NUM_OF_BLANK_ROWS = exports.BOARD_DEFAULT.rows - (((exports.CHECKERS_PER_PLAYER * 2) / exports.BOARD_DEFAULT.cols) * exports.NUM_OF_PLAYERS);
