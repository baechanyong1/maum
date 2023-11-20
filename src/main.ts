import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmConfigService } from './config/typeorm.config.service'; // 더미 데이터 생성 로직을 포함하는 서비스를 임포트합니다.
import { GraphQLSchemaBuilderModule } from '@nestjs/graphql/dist/schema-builder/schema-builder.module';
import GraphQLPlaygroundMiddleware from 'graphql-playground-middleware-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .addTag('your-api-tag')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [GraphQLSchemaBuilderModule],
  });

  app.use('/api', GraphQLPlaygroundMiddleware({ endpoint: '/graphql' }));

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  // await app.init()

  // const typeOrmConfigService = app.get(TypeOrmConfigService); // 서비스를 AppModule에서 주입받습니다.
  // await typeOrmConfigService.onModuleInit(); // 더미 데이터 생성 로직을 호출합니다.
  await app.listen(4000);
}

bootstrap();
