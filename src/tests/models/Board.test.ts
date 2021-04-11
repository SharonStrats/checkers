import { BOARD_DEFAULT } from "../../app/config/defaultOptions";
import { BoardError } from "../../app/enums/Error";
import { Board, BoardCell } from "../../app/models/Board";

// TODO: TEST PRIVATE FUNCTIONS AND MAKE THE BOARD SNAPSHOT
describe('Board', () => {
  const boardDimensions = BOARD_DEFAULT;
  const sizeResult = { rows: 8, cols: 8 }
 
  test.skip('Returns a Board', () => {
    // create a snapshot
    expect(new Board(boardDimensions)).toBe('Board');
  })
  describe('getter size' , () => {
    const boardDimensions = BOARD_DEFAULT;
    const sizeResult = { rows: 8, cols: 8 }
    let board = new Board(boardDimensions);

    test('given an 8 * 8 dimension size returns an object with 8 rows and 8 cols', () => {
      expect(board.size).toEqual(sizeResult);
    });
  });
  describe('getCellValue and setCellValue test', () => {
    const boardDimensions = BOARD_DEFAULT;
    const sizeResult = { rows: 8, cols: 8 }
    let board = new Board(boardDimensions);
    const cell: BoardCell = { playerId: 3, checkerId: 50} 
    test('after setting a value on a board cell the value is retrieved', () => {
      board.setCellValue(0, 1, cell)
      expect(board.getCellValue(0, 1)).toBe(cell);
    });
    test('setCellValue throws error when trying to set an invalid space', () => {
      try {
        board.setCellValue(0, 0, cell);
      } catch (error) {
      expect(error).toHaveProperty('message', BoardError.SpaceNotValid);
      }
    });
    test('getCellValue throws error when trying to set an invalid space', () => {
      try {
        board.getCellValue(0, 0);
      } catch (error) {
      expect(error).toHaveProperty('message', BoardError.SpaceNotValid);
      }
    });
  });
});