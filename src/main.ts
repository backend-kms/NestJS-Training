import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Swagger Title')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('tests')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document); // localhost:3000/swagger

  const serverConfig = config.get('server')
  const port = serverConfig.port;

  await app.listen(port);
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
