import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsArray, ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class AnswerInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  optionId: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  answerId: number;

}

@InputType()
export class CreateCompletedInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  questionnaireId: number;

  @Field(() => [AnswerInput])
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerInput)
  question: AnswerInput[];
}