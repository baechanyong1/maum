import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';

@Resolver(() => Questionnaire)
export class QuestionnaireResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Mutation(() => Questionnaire)
  createQuestionnaire(@Args('createQuestionnaireInput') createQuestionnaireInput: CreateQuestionnaireInput) {
    return this.questionnaireService.create(createQuestionnaireInput);
  }

  @Query(() => [Questionnaire], { name: 'questionnaire' })
  findAll() {
    return this.questionnaireService.findAll();
  }

  @Query(() => Questionnaire, { name: 'questionnaire' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionnaireService.findOne(id);
  }

  @Mutation(() => Questionnaire)
  updateQuestionnaire(@Args('updateQuestionnaireInput') updateQuestionnaireInput: UpdateQuestionnaireInput) {
    return this.questionnaireService.update(updateQuestionnaireInput.id, updateQuestionnaireInput);
  }

  @Mutation(() => Questionnaire)
  removeQuestionnaire(@Args('id', { type: () => Int }) id: number) {
    return this.questionnaireService.remove(id);
  }
}
