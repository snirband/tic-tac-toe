import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { CREATE_GAME, GAME_UPDATED, JOIN_GAME, MAKE_MOVE} from "../../graphql/queries.gql";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private apollo: Apollo) {}

  createGame() {
    return this.apollo.mutate({ mutation: CREATE_GAME });
  }

  joinGame(id: string) {
    return this.apollo.query({ query: JOIN_GAME, variables: { id } });
  }

  makeMove(id: string, index: number) {
    return this.apollo.mutate({ mutation: MAKE_MOVE, variables: { id, index } });
  }

  subscribeToGame(id: string): Observable<any> {
    return this.apollo.subscribe({ query: GAME_UPDATED, variables: { id } });
  }
}
