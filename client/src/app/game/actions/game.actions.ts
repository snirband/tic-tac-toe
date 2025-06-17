import { createAction, props } from '@ngrx/store';
import { Game } from '../game.models';

export const createGame = createAction('[Game] Create Game');
export const createGameSuccess = createAction('[Game] Create Game Success', props<{ game: Game }>());
export const createGameFailure = createAction('[Game] Create Game Failure', props<{ error: string }>());

export const joinGame = createAction('[Game] Join Game', props<{ id: string }>());
export const joinGameSuccess = createAction('[Game] Join Game Success', props<{ game: Game }>());
export const joinGameFailure = createAction('[Game] Join Game Failure', props<{ error: string }>());

export const makeMove = createAction('[Game] Make Move', props<{ id: string; index: number }>());
export const makeMoveSuccess = createAction('[Game] Make Move Success', props<{ game: Game }>());
export const makeMoveFailure = createAction('[Game] Make Move Failure', props<{ error: string }>());

export const gameUpdated = createAction('[Game] Game Updated', props<{ game: Game }>());
