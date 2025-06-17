import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Game {
  @Field() id: string;
  @Field(() => [String], { nullable: 'itemsAndList' })
  board: (string | null)[];
  @Field() currentPlayer: string;
  @Field({ nullable: true }) winner?: string;
}
