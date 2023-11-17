import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Answer } from 'src/answer/entities/answer.entity';
import { Completed } from 'src/completed/entities/completed.entity';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import { Question } from 'src/question/entities/question.entity';
import { Option } from 'src/option/entities/option.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234aaaa',
      database: 'postgres',
      entities: [Answer, Option, Question, Questionnaire, Completed],
      synchronize: true,
      logging : true,
    };
  }
}
