import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionnaireInput {
  @Field(() => Int)
  id: number;

  @Field()
  desc: string;
}
