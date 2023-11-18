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

  async createQuestionnaire(
    createQuestionnaireInput: CreateQuestionnaireInput,
  ) {
    const save = await this.questionnaireRepository.save(createQuestionnaireInput);
    console.log(save)
    return save
  }

  async findAll() {
    return this.questionnaireRepository.find();
  }

  async findOne(questionnaireId: number): Promise<Questionnaire> {
    return await this.questionnaireRepository.findOne({
      where: { questionnaireId },
    });
  }

  async updateQuestionnaire(
    id: number,
    updateQuestionnaireInput: UpdateQuestionnaireInput,
  ): Promise<Questionnaire> {
    const questionnaire = await this.findOne(id);
    return await this.questionnaireRepository.save(updateQuestionnaireInput);
  }

  async removeQuestionnaire(id: number) {
    const questionnaire = await this.findOne(id);
    return await this.questionnaireRepository.delete(id);
  }

  async findAllByQuestionnaireId(questionnaireId: number): Promise<Questionnaire[]> {
    const result = await this.questionnaireRepository.find({
      where: { questionnaireId },
      relations: [
        'questions',
        'questions.options',
        'questions.options.answers',
      ],
    });
  
    // 배열의 각 원소에 접근하여 desc 속성 출력
    result.forEach(questionnaire => {
      console.log(questionnaire.desc);
    });
  
    return result;
  }
  
}