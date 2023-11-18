import { Injectable } from '@nestjs/common';
import { CreateCompletedInput } from './dto/create-completed.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Completed } from './entities/completed.entity';
import { Answer } from 'src/answer/entities/answer.entity';
@Injectable()
export class CompletedService {
  constructor(
    @InjectRepository(Completed)
    private readonly completedRepository: Repository<Completed>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createCompleted(createCompletedInput: CreateCompletedInput): Promise<Completed> {
    const { questionnaireId, question } = createCompletedInput;
    console.log(question);
    let totalPoints = 0;
    // question 배열의 각 요소에 point를 추가하여 새로운 배열을 생성
    const questionWithPoints = await Promise.all(question.map(async ({ answerId, optionId }) => {
      const point = await this.getPointByAnswerId(answerId);
      return {
        optionId,
        answerId,
        point,
      };
    }));
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
    const result = await this.completedRepository
      .createQueryBuilder('completed')
      .where('completed.questionnaireId = :questionnaireId', { questionnaireId })
      .getMany();
  console.log(result)
    return result;
  }

  async findOne(completedId: number) {
    const result = await this.completedRepository.findOne({where:{completedId}});
    console.log(result)
    return result
  }
  
  private async getPointByAnswerId(answerId: number): Promise<number> {
    console.log("아이디", answerId)
    const answer = await this.answerRepository.findOne({
      where: { answerId },
      select: ['point'], 
    });
  console.log("앤서",answer)
    if (answer) {
      return answer.point;
    } else {
      console.log("오류",answer);
      return 0;
    }
  }
}
