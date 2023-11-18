import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OptionModule } from './option/option.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { AnswerModule } from './answer/answer.module';
import { CompletedModule } from './completed/completed.module';
import { QuestionModule } from './question/question.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    OptionModule,
    AnswerModule,
    CompletedModule,
    QuestionModule,
    QuestionnaireModule,
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useClass: TypeOrmConfigService,
        inject: [ConfigService],
      }),
  ],
})
export class AppModule {}
