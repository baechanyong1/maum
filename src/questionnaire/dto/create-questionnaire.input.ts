import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateQuestionnaireInput {
  @Field()
  readonly desc : string
}
