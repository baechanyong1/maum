import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompletedInput } from './dto/create-completed.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Completed } from './entities/completed.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import * as _ from 'lodash';
import { Question } from '@question/question.entity';
import { Option } from '@option/option.entity'
@Injectable()
export class CompletedService {
  constructor(
    @InjectRepository(Completed)
    private readonly completedRepository: Repository<Completed>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

async createCompleted(createCompletedInput: CreateCompletedInput): Promise<Completed> {
  try {
    const { questionnaireId, question } = createCompletedInput;
    const optionIds = createCompletedInput.question.map(answer => answer.optionId);
    const findQuestionIds = await this.questionRepository.createQueryBuilder('question')
    .select('question.questionId')
    .innerJoin('question.questionnaire', 'questionnaire')
    .innerJoin('question.options', 'option')
    .where('questionnaire.questionnaireId = :questionnaireId', { questionnaireId })
    .andWhere('option.optionId IN (:...optionIds)', { optionIds})
    .getMany()
    .then(questions => questions.map(question => question.questionId));
console.log(findQuestionIds);

    const allQuestionIds = await this.questionRepository.createQueryBuilder('question')
  .select('question.questionId')
  .innerJoin('question.questionnaire', 'questionnaire')
  .where('questionnaire.questionnaireId = :questionnaireId', { questionnaireId })
  .getMany()
  .then(questions => questions.map(question => question.questionId));
  await Promise.all(question.map(async ({ optionId }) => {
      const option = await this.optionRepository.findOne({where:{optionId}});
      if (!option) {
        throw new Error(`잘못된 optionId: ${optionId}`);
      }
    })
  );  
if (allQuestionIds.length !== findQuestionIds.length) {
  const troubleId = allQuestionIds.filter(x => !findQuestionIds.includes(x));
  throw new Error(`질문지에 맞지않는 문항을 골랐습니다. 문제의 ID는 다음과 같습니다: ${troubleId}`);
}
    let totalPoints = 0;
    const questionWithPoints = await Promise.all(
      question.map(async ({ answerId, optionId }) => {
        try {
          const point = await this.getPointByAnswerId(answerId);
          return {
            optionId,
            answerId,
            point,
          };
        } catch (error) {
          console.error(`answerId ${answerId}에 대한 점수를 가져오는 중 오류 발생:`, error);
          throw error; 
        }
      }),
    );
    for (const item of questionWithPoints) {
      totalPoints += item.point;
    }
    const completed = new Completed();
    completed.questionnaireId = questionnaireId;
    completed.question = questionWithPoints;
    completed.total = totalPoints;
    
    return this.completedRepository.save(completed);
  } catch (error) {
    console.error('createCompleted에서 오류 발생:', error);
    throw error;
  }
}


  async findAll(questionnaireId: number) {
    const completed = await this.completedRepository
      .createQueryBuilder('completed')
      .where('completed.questionnaireId = :questionnaireId', {
        questionnaireId,
      })
      .getMany();
    if (_.isNil(completed)) {
      throw new NotFoundException('Not found completed');
    }
    return completed;
  }

  async findOne(completedId: number) {
    const question = await this.completedRepository.findOne({
      where: { completedId },
    });
    if (_.isNil(question)) {
      throw new NotFoundException('Not found question');
    }
    return question;
  }

  private async getPointByAnswerId(answerId: number): Promise<number> {
    const pointInAnswer = await this.answerRepository.findOne({
      where: { answerId },
      select: ['point'],
    });
    if (_.isNil(pointInAnswer)) {
      throw new NotFoundException(`Not found answer`);
    }
    return pointInAnswer.point;
  }
}
