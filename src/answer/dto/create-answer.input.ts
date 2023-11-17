// create-answer.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field()
  desc: string;

  @Field(() => Int)
  point: number;
}