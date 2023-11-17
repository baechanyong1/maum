import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCompletedInput {
  @Field(() => Int)
  id: number;

  @Field()
  desc: string;
}
