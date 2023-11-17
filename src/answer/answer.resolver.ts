import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';


@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

    @Mutation(() => Answer)
  async createAnswer(@Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ){
    return await this.answerService.createAnswer(createAnswerInput);
  }

  @Query(() => [Answer])
  async answers(): Promise<Answer[]> {
    return this.answerService.findAll();
  }

  @Query(() => Answer, { nullable: true })
  async answer(@Args('answerId', { type: () => Int }) answerId: number) {
    return this.answerService.findById(answerId);
  }

  @Mutation(() => Answer)
  async updateAnswer(
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args('updateAnswerInput') updateAnswerInput:UpdateAnswerInput,
    ){
    return this.answerService.updateAnswer(answerId,updateAnswerInput);
  }

  @Mutation(() => Boolean)
  async deleteAnswer(@Args('answerId', { type: () => Int }) answerId: number) {
    return this.answerService.deleteAnswer(answerId);
  }
}
