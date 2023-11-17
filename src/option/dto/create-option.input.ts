import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOptionInput {
  @Field()
  readonly desc : string
}
