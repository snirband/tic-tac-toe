import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const httpUri = 'http://localhost:3000/graphql';
const wsUri = 'ws://localhost:3000/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create HTTP link
  const http = httpLink.create({ uri: httpUri });

  // Create WebSocket link
  const ws = new GraphQLWsLink(
    createClient({
      url: wsUri,
    })
  );

  // Split link: send subscriptions to WebSocket, queries/mutations to HTTP
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ws,
    http
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}


@NgModule({
  imports: [
    GameModule,
    BrowserModule,
    HttpClientModule,
    ApolloModule,
  ],
  providers: [
        {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  declarations:[AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
