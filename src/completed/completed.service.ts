import { Injectable } from '@nestjs/common';
import { CreateCompletedInput } from './dto/create-completed.input';
import { UpdateCompletedInput } from './dto/update-completed.input';

@Injectable()
export class CompletedService {
  create(createCompletedInput: CreateCompletedInput) {
    return 'This action adds a new completed';
  }

  findAll() {
    return `This action returns all completed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completed`;
  }

  remove(id: number) {
    return `This action removes a #${id} completed`;
  }
}
