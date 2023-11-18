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
    const maxPoint = await this.answerRepository
      .createQueryBuilder('answer')
      .select('MAX(answer.point)', 'maxPoint')
      .where('answer.optionId = :optionId', { optionId })
      .getRawOne();
  
    const newPoint = maxPoint ? maxPoint.maxPoint + 1 : 0;
  
    const answer = new Answer();
    answer.desc = createAnswerInput.desc;
    answer.point = newPoint;
    const option = await this.optionRepository.findOne({where:{optionId}});
    answer.option = option;
  
    const savedAnswer = await this.answerRepository.save(answer);
  
    return savedAnswer;
  }
  

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  async findOne(answerId: number): Promise<Answer> {
    return await this.answerRepository.findOne({
      where: { answerId },
    });
  }

  async updateAnswer(
    id: number,
    updateAnswerInput: UpdateAnswerInput,
  ): Promise<Answer> {
    const answer = await this.findOne(id);
    return await this.answerRepository.save(updateAnswerInput);
  }

  async removeAnswer(id: number) {
    const answer = await this.findOne(id);
    return await this.answerRepository.delete(id);
  }
}
