import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //   {origin: ["https://megakorm.ru/", "http://megakorm.ru", "http://localhost:3000"]}s
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    // заголовок
    .setTitle('Chat')
    // описание
    .setDescription('')
    // версия
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // первый параметр - префикс пути, по которому будет доступна документация
  SwaggerModule.setup('swagger', app, document);

  if (process.env.PORT) {
    await app.listen(process.env.PORT);
  } else {
    await app.listen(3005);
  }
}
bootstrap();
