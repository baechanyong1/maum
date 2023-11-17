import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerInput {
  @Field(() => Int)
  id: number;

  @Field()
  desc: string;

  @Field(() => Int)
  point: number;
}
