import { Args, Mutation, Query, Resolver, Int, ID } from '@nestjs/graphql';
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer)
  async createAnswer(
    @Args('optionId') optionId: number,
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ): Promise<Answer> {
    return this.answerService.createAnswer(optionId, createAnswerInput);
  }

  @Query(() => [Answer])
  async findAllAnswers(): Promise<Answer[]> {
    return this.answerService.findAll();
  }

  @Query(() => Answer)
  async findAnswerById(@Args('answerId') answerId: number): Promise<Answer> {
    return this.answerService.findOne(answerId);
  }

  @Mutation(() => Answer)
  async updateAnswer(
    @Args('id',{ type: () => Int }) id: number,
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ): Promise<Answer> {
    return this.answerService.updateAnswer(id, updateAnswerInput);
  }

  @Mutation(() => Answer)
  async deleteAnswer(@Args('id',{ type: () => Int }) id: number) {
    return this.answerService.removeAnswer(id);
  }
}
