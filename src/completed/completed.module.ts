import { Module } from '@nestjs/common';
import { CompletedService } from './completed.service';
import { CompletedResolver } from './completed.resolver';
import { Completed } from './entities/completed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import { Question } from '@question/question.entity';
import { Option } from '@option/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option,Completed,Answer,Questionnaire,Question])],
  providers: [CompletedResolver, CompletedService],
})
export class CompletedModule {}
