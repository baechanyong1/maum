import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  async createQuestion(
    @Args('questionnaireId') questionnaireId: number,
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput) {
      return this.questionService.createQuestion(questionnaireId, createQuestionInput);
    }


  @Query(() => [Question], { name: 'question' })
  async findAll(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findAll(id);
  }

  @Query(() => Question, { name: 'question' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput) {
    return this.questionService.updateQuestion(id, updateQuestionInput);
  }

  @Mutation(() => Question)
  async removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.removeQuestion(id);
  }
}
