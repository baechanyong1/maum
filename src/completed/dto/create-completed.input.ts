import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCompletedInput {
  @Field()
  readonly desc : string
}
