import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompletedService } from './completed.service';
import { Completed } from './entities/completed.entity';
import { CreateCompletedInput } from './dto/create-completed.input';
import { UpdateCompletedInput } from './dto/update-completed.input';

@Resolver(() => Completed)
export class CompletedResolver {
  constructor(private readonly completedService: CompletedService) {}

  @Mutation(() => Completed, { name: 'completion' })
  createCompletion(@Args('createCompletionInput') createCompletedInput: CreateCompletedInput) {
    return this.completedService.createCompleted(createCompletedInput);
  }
  

  @Query(() => [Completed], { name: 'completed' })
  findAll() {
    return this.completedService.findAll();
  }

  @Query(() => Completed, { name: 'completed' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.completedService.findOne(id);
  }
}
