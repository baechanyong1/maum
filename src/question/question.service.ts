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
    private questionnaireRepository: Repository<Questionnaire>,
  ) {}

  async createQuestion(
    questionnaireId: number,
    createQuestionInput: CreateQuestionInput,
  ) {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { questionnaireId },
    });
  
    const newQuestion = this.questionRepository.create({
      ...createQuestionInput,
      questionnaire,
    });
  
    const savedQuestion = await this.questionRepository.save(newQuestion);
    console.log(savedQuestion);
    return { ...savedQuestion, questionnaireId: savedQuestion.questionnaire.questionnaireId };
  }
  

  async findAll(questionnaireId: number) {
    return this.questionRepository.find({
      where: { questionnaire: { questionnaireId } },
      relations: ['options'],
    });
  }

  async findOne(questionId: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { questionId },
    });
    return question;
  }

  async updateQuestion(id: number, updateQuestionInput: UpdateQuestionInput) {
    const question = await this.findOne(id);
    return await this.questionRepository.save(updateQuestionInput);
  }

  async removeQuestion(id: number) {
    const question = await this.findOne(id);
    return await this.questionRepository.delete(id);
  }
}
