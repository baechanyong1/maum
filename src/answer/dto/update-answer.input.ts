import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateAnswerInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  desc: string;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  point: number;
}
