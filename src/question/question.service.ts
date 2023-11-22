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

  async findAll() {
    const question = await this.questionRepository.find()
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
    const existingQuestion = await this.findOne(id);

    if(!existingQuestion){
      throw new NotFoundException('Question not found')
    }
    const updateResult = await this.questionRepository.update(id, updateQuestionInput);
  
    if (updateResult.affected === 1) {
      // 업데이트가 성공했다면 업데이트된 엔터티를 반환합니다.
      return await this.questionRepository.findOne({ where: { questionId: id } });
    } else {
      // 업데이트가 실패하거나 영향을 받은 레코드가 없는 경우 예외를 throw합니다.
      throw new NotFoundException('Questionnaire not found');
    }
  }

  async removeQuestion(id: number) {
    const removeQuestion = await this.findOne(id);
     await this.questionRepository.delete(id);
     return removeQuestion
  }
}
