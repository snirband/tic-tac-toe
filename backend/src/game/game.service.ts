import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Game } from '../domain/game.model';

const pubSub = new PubSub();

@Injectable()
export class GameService {
  private games: Record<string, Game> = {};

  createGame(): Game {
    const id = Math.random().toString(36).substring(2, 6);
    const game: Game = {
      id,
      board: Array(9).fill(null),
      currentPlayer: 'X',
    };
    this.games[id] = game;
    return game;
  }

  joinGame(id: string): Game {
    return this.games[id];
  }

  makeMove(id: string, index: number): Game {
    const game = this.games[id];
    if (!game || game.board[index] || game.winner) return game;
    game.board[index] = game.currentPlayer;
    game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
    const winner = this.checkWinner(game.board);
    if (winner || !game.board.includes(null)) {
      game.winner = winner ?? 'DRAW';
    }
    pubSub.publish(`gameUpdated_${id}`, { gameUpdated: game });
    return game;
  }

  subscribeToGame(id: string) {
    return pubSub.asyncIterableIterator(`gameUpdated_${id}`);
  }

  private checkWinner(board: string[]): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
}
