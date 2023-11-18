import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly desc : string
}
