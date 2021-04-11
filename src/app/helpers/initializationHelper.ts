import { BoardOptions } from "../models/Board";

// calculate
export const numOfRowsToSkip = (boardDimensions: BoardOptions, numOfPlayers: number, numOfCheckersPerPlayer: number) => {
  const numberOfCheckersPerRow: number = boardDimensions.cols/2;
  const totalNumberOfCheckersToPlace: number = numOfPlayers * numOfCheckersPerPlayer;
  return boardDimensions.rows - (totalNumberOfCheckersToPlace/numberOfCheckersPerRow);
}