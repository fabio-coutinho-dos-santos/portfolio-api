import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription(
      'Thi api execute basics operations to portfolio application',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.API_PREFIX}/doc`, app, document);
  app.useGlobalPipes(new ValidationPipe());
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}
bootstrap();
