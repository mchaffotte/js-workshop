import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Company example')
    .setDescription('The company API description')
    .setVersion('1.0')
    .addTag('company')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('api');
  await app.listen(3000, 'localhost');
  console.log(`Application is running on: ${await app.getUrl()}`);
};
bootstrap();
