import {
  Resolver,
  Mutation,
  Args,
  Query,
  Subscription,
  Int,
} from '@nestjs/graphql';
import { Game } from '../models/game.model';
import { GameService } from './game.service';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Mutation(() => Game)
  createGame(): Game {
    return this.gameService.createGame();
  }

  @Query(() => Game)
  joinGame(@Args('id') id: string): Game {
    return this.gameService.joinGame(id);
  }

  @Mutation(() => Game)
  makeMove(
    @Args('id') id: string,
    @Args('index', { type: () => Int }) index: number,
  ): Game {
    return this.gameService.makeMove(id, index);
  }

  @Subscription(() => Game, {
    resolve: (value) => value.gameUpdated,
  })
  gameUpdated(@Args('id') id: string) {
    return this.gameService.subscribeToGame(id);
  }
}
