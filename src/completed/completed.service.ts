import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompletedInput } from './dto/create-completed.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Completed } from './entities/completed.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import * as _ from 'lodash';
@Injectable()
export class CompletedService {
  constructor(
    @InjectRepository(Completed)
    private readonly completedRepository: Repository<Completed>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}
//선택이 되지 않은 질문 항목 유효성검사
  async createCompleted(
    createCompletedInput: CreateCompletedInput,
  ): Promise<Completed> {
    const { questionnaireId, question } = createCompletedInput;
    console.log(question);
    let totalPoints = 0;
    const questionWithPoints = await Promise.all(
      question.map(async ({ answerId, optionId }) => {
        const point = await this.getPointByAnswerId(answerId);
        return {
          optionId,
          answerId,
          point,
        };
      }),
    );
    for (const item of questionWithPoints) {
      totalPoints += item.point;
    }
    const completed = new Completed();
    completed.questionnaireId = questionnaireId;
    completed.question = questionWithPoints;
    completed.total = totalPoints;
    console.log(completed);
    return this.completedRepository.save(completed);
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
