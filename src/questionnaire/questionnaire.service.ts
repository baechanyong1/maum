import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';
import { Questionnaire } from './entities/questionnaire.entity';
import * as _ from 'lodash';

@Injectable()
export class QuestionnaireService {
  @InjectRepository(Questionnaire)
  private questionnaireRepository: Repository<Questionnaire>;

  async createQuestionnaire(
    createQuestionnaireInput: CreateQuestionnaireInput,
  ) {
    await this.questionnaireRepository.save(createQuestionnaireInput);
    return createQuestionnaireInput;
  }

  async findAll() {
    return this.questionnaireRepository.find();
  }

  async findOne(questionnaireId: number): Promise<Questionnaire> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { questionnaireId },
    });
    if (_.isNil(questionnaire)) {
      throw new NotFoundException('Not found questionnaire');
    }
    return questionnaire;
  }

  async updateQuestionnaire(
    id: number,
    updateQuestionnaireInput: UpdateQuestionnaireInput,
  ): Promise<Questionnaire> {
    await this.findOne(id);
    return await this.questionnaireRepository.save(updateQuestionnaireInput);
  }

  async removeQuestionnaire(id: number) {
    await this.findOne(id);
    return await this.questionnaireRepository.delete(id);
  }

  async findAllByQuestionnaireId(
    questionnaireId: number,
  ): Promise<Questionnaire[]> {
    const result = await this.questionnaireRepository.find({
      where: { questionnaireId },
      relations: [
        'questions',
        'questions.options',
        'questions.options.answers',
      ],
    });
    result.forEach((questionnaire) => {
    });
    if (_.isNil(result)) {
      throw new NotFoundException('Not found result');
    }
    return result;
  }
}
