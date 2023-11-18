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
      // answerId, optionId, point를 question에 추가
      return {
        answerId,
        optionId,
        point,
      };
    }));
    // questionWithPoints 배열을 순회하면서 point를 더함
    for (const item of questionWithPoints) {
      totalPoints += item.point;
    }
    const completed = new Completed();
    completed.questionnaireId = questionnaireId;
    completed.question = questionWithPoints; // question 대신 questionWithPoints 사용
    completed.total = totalPoints;
    console.log(completed);
    return this.completedRepository.save(completed);
  }
  findAll() {
    return `This action returns all completed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completed`;
  }

  // 여기서 null반환
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
  
  // 설문지 id와 선택지 id, 답변 id + 포인트를 받아서 저장
  // 받은 포인트들의 총점도 저장 = total

  // 설문지 완료 요청은 completion
  // 설문지 완료는 {optionId, answerId, point } total 이렇게 저장할 예정
  // 설문지 조회는 completed로 엔드포인트 설정
}
