// graphql.module.ts
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { createApolloClient } from './init-setups';

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return createApolloClient();
      },
    },
  ],
})
export class GraphQLModule {}
