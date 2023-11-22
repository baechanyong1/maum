import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class UpdateOptionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  desc: string;
}
