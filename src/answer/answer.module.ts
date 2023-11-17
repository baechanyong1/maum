import { Module } from '@nestjs/common';
import { AnswerService } from 'src/answer/answer.service';
import { AnswerResolver } from 'src/answer/answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { Option } from 'src/option/entities/option.entity'

@Module({
  imports: [ TypeOrmModule.forFeature([Answer, Option])],
  providers: [AnswerResolver, AnswerService],
})
export class AnswerModule {}
