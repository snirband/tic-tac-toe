import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createGame, createGameFailure, createGameSuccess, gameUpdated, joinGame, joinGameFailure, joinGameSuccess, makeMove, makeMoveFailure, makeMoveSuccess } from '../actions/game.actions';
import { GameState } from '../game.models';

const initialState: GameState = {
  game: null,
  loading: false,
  error: null,
};

export const gameReducer = createReducer(
  initialState,
  on(createGame, joinGame, makeMove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createGameSuccess, joinGameSuccess, makeMoveSuccess, gameUpdated, (state, { game }) => ({
    ...state,
    game,
    loading: false,
  })),
  on(createGameFailure, joinGameFailure, makeMoveFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const selectGameState = createFeatureSelector<GameState>('game');
export const selectGame = createSelector(
  selectGameState,
  (state) => state.game
);
export const selectIsLoading = createSelector(
  selectGameState,
  (state) => state.loading
);