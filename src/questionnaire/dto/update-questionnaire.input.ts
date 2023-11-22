import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateQuestionnaireInput {


  @Field()
  @IsString()
  @IsNotEmpty()
  desc: string;
}
