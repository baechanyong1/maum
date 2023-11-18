import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import * as _ from 'lodash';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Questionnaire)
    private questionnaireRepository: Repository<Questionnaire>,
  ) {}

  async createQuestion(
    questionnaireId: number,
    createQuestionInput: CreateQuestionInput,
  ) {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { questionnaireId },
    });
    if (_.isNil(questionnaire)) {
      throw new NotFoundException('Not found questionnaire');
    }
    const newQuestion = this.questionRepository.create({
      ...createQuestionInput,
      questionnaire,
    });

    const savedQuestion = await this.questionRepository.save(newQuestion);
    console.log(savedQuestion);
    return {
      ...savedQuestion,
      questionnaireId: savedQuestion.questionnaire.questionnaireId,
    };
  }

  async findAll(questionnaireId: number) {
    const question = await this.questionRepository.find({
      where: { questionnaire: { questionnaireId } },
      relations: ['options'],
    });
    if (_.isNil(question)) {
      throw new NotFoundException('Not found question');
    }
    return question;
  }

  async findOne(questionId: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { questionId },
    });
    if (_.isNil(question)) {
      throw new NotFoundException('Not found question');
    }
    return question;
  }

  async updateQuestion(id: number, updateQuestionInput: UpdateQuestionInput) {
    await this.findOne(id);
    return await this.questionRepository.save(updateQuestionInput);
  }

  async removeQuestion(id: number) {
    await this.findOne(id);
    return await this.questionRepository.delete(id);
  }
}
