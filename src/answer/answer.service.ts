import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Option } from '../option/entities/option.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Option)
    private optionRepository: Repository<Option>, 
  ) {}

  async createAnswer(optionId: number, createAnswerInput: CreateAnswerInput) {
    const option = await this.optionRepository.findOne({where : {optionId}});

    if (!option) {
      // 처리할 로직 추가: 해당하는 option이 없을 때의 예외 처리 등
    }

    const answer = new Answer();
    answer.desc = createAnswerInput.desc;
    answer.option = option;

    return await this.answerRepository.save(answer);
  }

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  async findById(answerId: number): Promise<Answer> {
    return await this.answerRepository.findOne({
      where: { answerId },
    });
  }

  async updateAnswer(id: number, updateAnswerInput: UpdateAnswerInput): Promise<Answer> {
    const answer = await this.findById(id);
    return await this.answerRepository.save(updateAnswerInput);
  }

  async deleteAnswer(id: number) {
    const answer = await this.findById(id);
    return await this.answerRepository.delete(id);
  }
}
