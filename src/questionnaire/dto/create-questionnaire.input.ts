import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateQuestionnaireInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly desc : string
}
