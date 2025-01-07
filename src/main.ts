import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Настройка Swagger
    const config = new DocumentBuilder()
      .setTitle('Trade Hub API')
      .setDescription('API документация Trade Hub')
      .setVersion('1.0')
      .build();

    app.enableCors({
      origin: [
        'http://localhost:3000',
        /^http:\/\/192\.168\.0\.\d+:3000$/, // Разрешает любой IP в диапазоне 192.168.0.0-255:3000
    ], // URL вашего Next.js приложения
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
      });
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
    await app.init();
    const port = 5888;
    await app.listen(port);
    
    // Добавляем сообщение о доступности Swagger
    Logger.log(`📝 Swagger документация доступна по адресу: http://localhost:${port}/api`);
  } catch (error: unknown) {
    Logger.error(`❌ Error starting server: ${(error as Error).message}`, (error as Error).stack);
  }
}

bootstrap();
