import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';
import { Course } from './courses/course.model';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  // Initialize Sequelize (sqlite) and sync models before starting the app
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    models: [Course],
    logging: false,
  });

  await sequelize.sync({ alter: true });

  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Prueba Backend - Courses API')
    .setDescription('API CRUD para gestionar cursos')
    .setVersion('1.0')
    .addTag('courses')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI available at: http://localhost:${port}/swagger-ui`);
}

bootstrap();
