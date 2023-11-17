import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(createAnswerInput: CreateAnswerInput): Promise<Answer> {
    return await this.answerRepository.save(createAnswerInput)
  }

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  async findById(answerId: number) {
    return await this.answerRepository.findOne({
      where : {answerId}
    });
  }

  async updateAnswer(id: number, updateAnswerInput:UpdateAnswerInput) {
    const answer = await this.findById(id);
    return await this.answerRepository.save(updateAnswerInput)
  }

  async deleteAnswer(id: number) {
    const answer = await this.findById(id)
    return await this.answerRepository.delete(id);
  }
}
