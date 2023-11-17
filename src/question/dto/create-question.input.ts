import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field()
  readonly desc : string
}
