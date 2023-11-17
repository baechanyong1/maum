import { CreateQuestionnaireInput } from 'src/questionnaire/dto/create-questionnaire.input'; 
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionnaireInput) {
  @Field(() => Int)
  id: number;
}
