import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Option } from '../option/entities/option.entity';
import * as _ from 'lodash';

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
    const option = await this.optionRepository.findOne({ where: { optionId } });
    if (_.isNil(answer)) {
      throw new NotFoundException('Not found option');
    }
    answer.option = option;

    const savedAnswer = await this.answerRepository.save(answer);

    return savedAnswer;
  }

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  async findOne(answerId: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: { answerId },
    });
    if (_.isNil(answer)) {
      throw new NotFoundException('Not found answer');
    }
    return answer;
  }

  async updateAnswer(
    id: number,
    updateAnswerInput: UpdateAnswerInput,
  ) {
    const exitingAnswer = await this.findOne(id);
    if(!exitingAnswer){
      throw new NotFoundException('Answer not found')
    }
    const updateResult = await this.answerRepository.update(id, updateAnswerInput);
  
    if (updateResult.affected === 1) {
      // 업데이트가 성공했다면 업데이트된 엔터티를 반환합니다.
      return await this.answerRepository.findOne({ where: { answerId: id } });
    } else {
      // 업데이트가 실패하거나 영향을 받은 레코드가 없는 경우 예외를 throw합니다.
      throw new NotFoundException('Answer not found');
    }
  }

  async removeAnswer(id: number) {
    await this.findOne(id);
    return await this.answerRepository.delete(id);
  }
}
