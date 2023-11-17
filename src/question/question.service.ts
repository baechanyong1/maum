import { Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';

@Injectable()
export class QuestionService {
  constructor(
@InjectRepository(Question)
private questionRepository: Repository<Question>,
@InjectRepository(Questionnaire)
private questionnaireRepository: Repository<Questionnaire>
  ){}
  async create(questionnaireId: number ,createQuestionInput: CreateQuestionInput) {
    const question = await this.questionnaireRepository.findOne({where : {questionnaireId}})
    return await this.questionRepository.save(createQuestionInput)
  }

  async findAll() {
    return `This action returns all question`;
  }

  async findOne(questionId: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where : {questionId}
    })
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const question = await this.findOne(id)
    return await this.questionRepository.save(updateQuestionInput)
  }

  async remove(id: number) {
    const question = await this.findOne(id)
    return await this.questionRepository.delete(id)
  }
}
