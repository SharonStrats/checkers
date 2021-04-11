import { BOARD_DEFAULT, NUM_OF_PLAYERS, CHECKERS_PER_PLAYER } from "../../app/config/defaultOptions";
import { numOfRowsToSkip } from "../../app/helpers/initializationHelper";

describe('initialize helper', () => {

  describe('numOfRowsToSkip', () => {
    test('Should return 2 for a typical default board, players, and number of checkers', () => {
      expect(numOfRowsToSkip(BOARD_DEFAULT, NUM_OF_PLAYERS, CHECKERS_PER_PLAYER)).toBe(2);
    });
  });
});