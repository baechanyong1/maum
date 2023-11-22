import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateQuestionnaireInput {


  @Field()
  @IsString()
  @IsNotEmpty()
  desc: string;
}

    // // 새로운 속성을 추가
    // @Field(() => [Int], { nullable: true })
    // questionnaireId?: number[];
  
    // @Field(() => [Int], { nullable: true })
    // questions?: number[];
  
    // @Field({ nullable: true })
    // @IsBoolean()
    // completed?: boolean;

