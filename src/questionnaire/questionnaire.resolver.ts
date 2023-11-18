import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';

@Resolver(() => Questionnaire)
export class QuestionnaireResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Mutation(() => Questionnaire)
  async createQuestionnaire(@Args('createQuestionnaireInput') createQuestionnaireInput: CreateQuestionnaireInput) {
    return this.questionnaireService.createQuestionnaire(createQuestionnaireInput);
  }

  @Query(() => [Questionnaire], { name: 'questionnaire' })
  async findAll() {
    return this.questionnaireService.findAll();
  }

  @Query(() => Questionnaire, { name: 'questionnaire' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionnaireService.findOne(id);
  }

  @Mutation(() => Questionnaire)
  async updateQuestionnaire(@Args('updateQuestionnaireInput') updateQuestionnaireInput: UpdateQuestionnaireInput) {
    return this.questionnaireService.updateQuestionnaire(updateQuestionnaireInput.id, updateQuestionnaireInput);
  }

  @Mutation(() => Questionnaire)
  async removeQuestionnaire(@Args('id', { type: () => Int }) id: number) {
    return this.questionnaireService.removeQuestionnaire(id);
  }

  @Query(() => [Questionnaire], { name: 'AllOfByQuestionnaireId'})
  async findAllByQuestionnaireId(@Args('questionnaireId') questionnaireId: number): Promise<Questionnaire[]> {
    return this.questionnaireService.findAllByQuestionnaireId(questionnaireId);
  }
}
