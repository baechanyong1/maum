import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  await app.listen(4000);
}

bootstrap();
