import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateOptionInput {
  @Field(() => Int)
  id: number;

  @Field()
  desc: string;
}
