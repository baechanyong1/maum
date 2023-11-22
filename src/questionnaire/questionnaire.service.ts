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

  async findAll(){
    const questionnaire = await this.questionnaireRepository.find()
    if(questionnaire.length===0){
      throw new NotFoundException('Not found questionnaire')
    }
    return questionnaire
  }

  private async findOne(questionnaireId: number): Promise<Questionnaire> {
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
      return await this.questionnaireRepository.findOne({ where: { questionnaireId: id } });
    } else {
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
