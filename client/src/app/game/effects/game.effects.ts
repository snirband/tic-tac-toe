import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo } from 'apollo-angular';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createGame, createGameFailure, createGameSuccess, gameUpdated, joinGame, joinGameFailure, joinGameSuccess, makeMove, makeMoveFailure, makeMoveSuccess } from '../actions/game.actions';
import { CREATE_GAME, GAME_UPDATED, JOIN_GAME, MAKE_MOVE } from 'src/app/graphql/queries.gql';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions, private apollo: Apollo) {}

  createGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGame),
      mergeMap(() =>
        this.apollo.mutate({
          mutation: CREATE_GAME,
        }).pipe(
          mergeMap((result: any) => [createGameSuccess({ game: result.data.createGame }),joinGameSuccess({game:result.data.createGame})]),
          catchError((error) => of(createGameFailure({ error: error.message })))
        )
      )
    )
  );

  joinGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(joinGame),
      mergeMap(({ id }) =>
        this.apollo.query({
          query: JOIN_GAME,
          variables: { id },
        }).pipe(
          map((result: any) => joinGameSuccess({ game: result.data.joinGame })),
          catchError((error) => of(joinGameFailure({ error: error.message })))
        )
      )
    )
  );

  makeMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(makeMove),
      mergeMap(({ id, index }) =>
        this.apollo.mutate({
          mutation: MAKE_MOVE,
          variables: { id, index },
        }).pipe(
          map((result: any) => makeMoveSuccess({ game: result.data.makeMove })),
          catchError((error) => of(makeMoveFailure({ error: error.message })))
        )
      )
    )
  );

  gameSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(joinGameSuccess),
      switchMap(({ game }) =>
        this.apollo.subscribe({
          query: GAME_UPDATED,
          variables: { id: game.id },
        }).pipe(
          map((result: any) => gameUpdated({ game: result.data.gameUpdated }))
        )
      )
    )
  );
}
