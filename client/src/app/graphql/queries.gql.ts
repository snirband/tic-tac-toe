import { gql } from 'apollo-angular';

export const CREATE_GAME = gql`
  mutation {
    createGame {
      id
      board
      currentPlayer
      winner
    }
  }
`;

export const JOIN_GAME = gql`
  query joinGame($id: String!) {
    joinGame(id: $id) {
      id
      board
      currentPlayer
      winner
    }
  }
`;

export const MAKE_MOVE = gql`
  mutation makeMove($id: String!, $index: Int!) {
    makeMove(id: $id, index: $index) {
      id
      board
      currentPlayer
      winner
    }
  }
`;

export const GAME_UPDATED = gql`
  subscription gameUpdated($id: String!) {
    gameUpdated(id: $id) {
      id
      board
      currentPlayer
      winner
    }
  }
`;

