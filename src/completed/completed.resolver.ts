import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompletedService } from './completed.service';
import { Completed } from './entities/completed.entity';
import { CreateCompletedInput } from './dto/create-completed.input';
import { UpdateCompletedInput } from './dto/update-completed.input';

@Resolver(() => Completed)
export class CompletedResolver {
  constructor(private readonly completedService: CompletedService) {}

  @Mutation(() => Completed)
  createCompleted(@Args('createCompletedInput') createCompletedInput: CreateCompletedInput) {
    return this.completedService.create(createCompletedInput);
  }

  @Query(() => [Completed], { name: 'completed' })
  findAll() {
    return this.completedService.findAll();
  }

  @Query(() => Completed, { name: 'completed' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.completedService.findOne(id);
  }

  @Mutation(() => Completed)
  removeCompleted(@Args('id', { type: () => Int }) id: number) {
    return this.completedService.remove(id);
  }
}
