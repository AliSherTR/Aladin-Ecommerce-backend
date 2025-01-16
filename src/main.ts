import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000" , "http://localhost:3001"],
    
  })
  app.use(cookieParser());
  app.setGlobalPrefix("api")
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
