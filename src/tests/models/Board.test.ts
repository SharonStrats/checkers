import { BOARD_DEFAULT } from "../../app/config/defaultOptions";
import { BoardError } from "../../app/enums/Error";
import { Board, BoardCell } from "../../app/models/Board";

describe('Board', () => {
  const boardDimensions = BOARD_DEFAULT;
  const sizeResult = { rows: 8, cols: 8 };
  const board = new Board();
  const emptyCell: BoardCell = { playerId: 0, checkerId: 0};
 
  test('Returns a Board', () => {
    //expect(board).toMatchObject(Board);
  });

  test('Invalid cells row 0', () => {
    expect(board.getCellValue(0,0)).toBe(null);
    expect(board.getCellValue(0,2)).toBe(null);
    expect(board.getCellValue(0,4)).toBe(null);
    expect(board.getCellValue(0,6)).toBe(null);
  });

  test('Invalid cells row 1', () => {
    expect(board.getCellValue(1,1)).toBe(null);
    expect(board.getCellValue(1,3)).toBe(null);
    expect(board.getCellValue(1,5)).toBe(null);
    expect(board.getCellValue(1,7)).toBe(null);
  });

  test('Empty cells row 3', () => {
    expect(board.getCellValue(3,0)).toEqual(emptyCell);
    expect(board.getCellValue(3,2)).toEqual(emptyCell);
    expect(board.getCellValue(3,4)).toEqual(emptyCell);
    expect(board.getCellValue(3,6)).toEqual(emptyCell);
  });
  test('Empty cells row 4', () => {
    expect(board.getCellValue(4,1)).toEqual(emptyCell);
    expect(board.getCellValue(4,3)).toEqual(emptyCell);
    expect(board.getCellValue(4,5)).toEqual(emptyCell);
    expect(board.getCellValue(4,7)).toEqual(emptyCell);
  });
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