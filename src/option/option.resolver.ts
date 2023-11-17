import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionService } from './option.service';
import { Option } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';

@Resolver(() => Option)
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  @Mutation(() => Option)
  createOption(
    @Args('questionId') questionId: number,
    @Args('createOptionInput') createOptionInput: CreateOptionInput) {
    return this.optionService.create(questionId, createOptionInput);
  }

  // api 다 완료 후 작성 예정
  @Query(() => [Option], { name: 'option' })
  findAll() {
    return this.optionService.findAll();
  }

  @Query(() => Option, { name: 'option' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.optionService.findOne(id);
  }

  @Mutation(() => Option)
  updateOption(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput) {
    return this.optionService.update(id, updateOptionInput);
  }

  @Mutation(() => Option)
  removeOption(@Args('id', { type: () => Int }) id: number) {
    return this.optionService.remove(id);
  }
}
