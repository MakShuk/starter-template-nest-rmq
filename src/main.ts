import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  let port = 5888;
  let serverStarted = false;

  while (!serverStarted) {
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
          /^http:\/\/localhost:(3[0-9]{3}|[4-5][0-9]{3}|6000)$/, // Разрешает порты с 3000 до 6000 на localhost
          /^http:\/\/192\.168\.0\.\d+:(3[0-9]{3}|[4-5][0-9]{3}|6000)$/, // Разрешает любой IP в диапазоне 192.168.0.0-255 с портами 3000-6000
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
      });

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);

      await app.init();
      await app.listen(port);

      // Добавляем сообщение о доступности Swagger
      Logger.log(`📝 Swagger документация доступна по адресу: http://localhost:${port}/api`);
      serverStarted = true;
    } catch (error: unknown) {
      Logger.error(`❌ Error starting server on port ${port}: ${(error as Error).message}`, (error as Error).stack);
      port++;
      if (port > 65535) {
        Logger.error(`❌ Could not start server after multiple port retries.`);
        break;
      }
    }
  }
}

bootstrap();
