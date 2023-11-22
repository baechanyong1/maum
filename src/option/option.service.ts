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
    const option = await this.optionRepository.find();
    if(option.length===0){
      throw new NotFoundException('Not found option')
    }
    return option
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
    const existingOption = await this.findOne(id);
    if(!existingOption){
      throw new NotFoundException('Option not found')
    }
    const updateResult = await this.optionRepository.update(id, updateOptionInput);
  
    if (updateResult.affected === 1) {
      return await this.optionRepository.findOne({ where: { optionId: id } });
    } else {
      throw new NotFoundException('Option not found');
    }
  }

  async removeOption(id: number) {
    const removeOption = await this.findOne(id);
    await this.optionRepository.delete(id);
    return removeOption
  }
}
