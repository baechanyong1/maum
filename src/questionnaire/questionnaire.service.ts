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
    const existingQuestionnaire = await this.findOne(id);
  
    if (!existingQuestionnaire) {
      throw new NotFoundException('Questionnaire not found');
    }
  
    const updateResult = await this.questionnaireRepository.update(id, updateQuestionnaireInput);
  
    if (updateResult.affected === 1) {
      // 업데이트가 성공했다면 업데이트된 엔터티를 반환합니다.
      return await this.questionnaireRepository.findOne({ where: { questionnaireId: id } });
    } else {
      // 업데이트가 실패하거나 영향을 받은 레코드가 없는 경우 예외를 throw합니다.
      throw new NotFoundException('Questionnaire not found');
    }
  }
  
  async removeQuestionnaire(id: number) {
    const removeQuestionnaire = await this.findOne(id);
   await this.questionnaireRepository.delete(id);
   return removeQuestionnaire
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
