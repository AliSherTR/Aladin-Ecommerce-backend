import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true

  })

  app.use(cookieParser());
  app.setGlobalPrefix("api")

  // Serve static assets
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  const config = new DocumentBuilder() // configure the meta data for swagger documentation
    .setTitle('Aladin API')
    .setDescription('API documentation for Aladin Ecommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
