import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';
import { Course } from './courses/course.model';

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
  // Ensure app modules are initialized so swagger can scan routes reliably
  await app.init();

  const config = new DocumentBuilder()
    .setTitle('Prueba Backend - Courses API')
    .setDescription('API CRUD para gestionar cursos')
    .setVersion('1.0')
    .build();

  try {
    const document = SwaggerModule.createDocument(app, config, {
      include: [AppModule],
    });
    SwaggerModule.setup('api', app, document);
  } catch (err) {
    // If swagger scanning fails (version/internal differences), continue without Swagger
    // and log the error so the server still starts and the CRUD remains usable.
    // You can re-enable Swagger later after aligning @nestjs/swagger with your Nest version.
    // eslint-disable-next-line no-console
    console.warn('Swagger setup skipped due to error:', err?.message ?? err);
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
