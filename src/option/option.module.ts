import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/option/entities/option.entity'
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Option, Question])],
  providers: [OptionResolver, OptionService],
})
export class OptionModule {}