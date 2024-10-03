import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as auth0config } from './config/auth0.config';
import { auth } from 'express-openid-connect';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Middleware de autenticación (descomentar para usar)
  // app.use(auth(auth0config));

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Permitir todos los orígenes durante la etapa de desarrollo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PupShops')
    .setDescription('Documentación referida al E-Commerce PupShops')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}

bootstrap();
