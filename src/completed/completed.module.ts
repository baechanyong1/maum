import { Module } from '@nestjs/common';
import { CompletedService } from './completed.service';
import { CompletedResolver } from './completed.resolver';
import { Completed } from './entities/completed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Completed,Answer,Questionnaire])],
  providers: [CompletedResolver, CompletedService],
})
export class CompletedModule {}
