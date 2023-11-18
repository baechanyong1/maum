import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
class AnswerInput {
  @Field(() => Int)
  optionId: number;

  @Field(() => Int)
  answerId: number;

  @Field(() => Int,{ nullable: true })
  point: number;
}

@InputType()
export class CreateCompletedInput {
  @Field(() => Int)
  questionnaireId: number;

  @Field(() => [AnswerInput])
  question: AnswerInput[];

  // @Field(() => Int)
  // total: number;
}