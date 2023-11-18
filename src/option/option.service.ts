import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import * as _ from 'lodash';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  async createOption(questionId: number, createOptionInput: CreateOptionInput) {
    const question = await this.questionRepository.findOne({
      where: { questionId },
    });
    if (_.isNil(question)) {
      throw new NotFoundException('Not found question');
    }
    const newOption = this.optionRepository.create({
      ...createOptionInput,
      question,
    });
    return await this.optionRepository.save(newOption);
  }

  async findAll() {
    return `This action returns all option`;
  }

  async findOne(optionId: number): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where: { optionId },
    });
    if (_.isNil(option)) {
      throw new NotFoundException('Not found option');
    }
    return option;
  }

  async updateOption(id: number, updateOptionInput: UpdateOptionInput) {
    await this.findOne(id);
    return await this.questionRepository.save(updateOptionInput);
  }

  async removeOption(id: number) {
    await this.findOne(id);
    return await this.optionRepository.delete(id);
  }
}
