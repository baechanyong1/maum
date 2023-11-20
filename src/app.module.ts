import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OptionModule } from './option/option.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { AnswerModule } from './answer/answer.module';
import { CompletedModule } from './completed/completed.module';
import { QuestionModule } from './question/question.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { LoggerModule } from './utils/logger/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/http.exception.finter';
import { LoggerMiddleware } from './middleware/logger';
// import { TypeOrmConfigModule } from './config/typeorm.config.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    LoggerModule,
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
