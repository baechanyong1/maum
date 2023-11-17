import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';
import { Questionnaire } from './entities/questionnaire.entity';

@Injectable()
export class QuestionnaireService {
  @InjectRepository(Questionnaire)
  private questionnaireRepository: Repository<Questionnaire>;

  async createQuestionnaire(createQuestionnaireInput: CreateQuestionnaireInput) {
    await this.questionnaireRepository.save(createQuestionnaireInput);
  }

  async findAll() {
    return this.questionnaireRepository.find()
  }

  async findOne(questionnaireId: number): Promise<Questionnaire> {
    return await this.questionnaireRepository.findOne({
      where: { questionnaireId },
    });
  }

  async updateQuestionnaire(id: number, updateQuestionnaireInput: UpdateQuestionnaireInput): Promise<Questionnaire> {
    const questionnaire = await this.findOne(id);
    return await this.questionnaireRepository.save(updateQuestionnaireInput);
  }

  async removeQuestionnaire(id: number) {
    const questionnaire = await this.findOne(id);
    return await this.questionnaireRepository.delete(id);
  }
}
