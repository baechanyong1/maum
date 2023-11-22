import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([Question, Questionnaire])],
  providers: [QuestionResolver, QuestionService]
})
export class QuestionModule {}
