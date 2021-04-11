import { Position } from './Position';

export interface Checker {
  checkerId: number,
  playerId: number,
  position: Position,
  direction: string
}

export interface CheckerState {
  pieceId: number,
  kinged: boolean
}