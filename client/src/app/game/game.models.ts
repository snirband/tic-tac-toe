export interface Game {
  id: string;
  board: (string | null)[];
  currentPlayer: string;
  winner?: string;
}

export interface GameState {
    game: Game | null;
    loading: boolean;
    error: string | null;
}