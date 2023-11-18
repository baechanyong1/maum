import { Injectable } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>
  )
  {}
  async createOption(questionId: number, createOptionInput: CreateOptionInput) {
    const question = await this.questionRepository.findOne({ where: { questionId } });
    if (!question) {
      throw new Error('Question not found'); // 또는 적절한 에러 처리 방식으로 변경
    }
    const newOption = this.optionRepository.create({
      ...createOptionInput,
      question, // Question 엔터티를 연결
    });
    return await this.optionRepository.save(newOption);
  }
  async findAll() {
    return `This action returns all option`;
  }

  async findOne(optionId: number): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where : {optionId}
    })
    return option
  }

  async updateOption(id: number, updateOptionInput: UpdateOptionInput) {
    const option = await this.findOne(id)
    return await this.questionRepository.save(updateOptionInput)
  }

  async removeOption(id: number) {
    const option = await this.findOne(id)
    return await this.optionRepository.delete(id)
  }
}
