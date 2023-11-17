import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { Questionnaire } from './entities/questionnaire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ TypeOrmModule.forFeature([Questionnaire])],
  providers: [QuestionnaireResolver, QuestionnaireService]
})
export class QuestionnaireModule {}
