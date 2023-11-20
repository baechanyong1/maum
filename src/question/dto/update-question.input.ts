import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class UpdateQuestionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly desc: string;
}
