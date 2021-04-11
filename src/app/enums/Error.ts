export enum GameControlError {
  SpaceOccupied = 'Invalid move: space occupied',
  NotForward = 'Invalid Move: not moving forward',
  NotOneSpace = 'Invalid Move: more than one space'
}

export enum BoardError {
  SpaceNotValid = 'Invalid Space: not a valid space to set',
}
