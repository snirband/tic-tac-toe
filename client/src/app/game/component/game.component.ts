import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { createGame, joinGame, makeMove } from "../actions/game.actions";
import { selectGame, selectIsLoading } from "../reducers/game.reducer";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent {
  game$ = this.store.select(selectGame);
  loading$ = this.store.select(selectIsLoading);
  gameId: string='';

  constructor(private store: Store) {
    // this.createGa  me();
  }

  createGame() {
    this.store.dispatch(createGame());
  }

  joinGame() {
    this.store.dispatch(joinGame({ id: this.gameId }));
  }

  makeMove(id: string, index: number) {
    this.store.dispatch(makeMove({ id, index }));
  }
}
