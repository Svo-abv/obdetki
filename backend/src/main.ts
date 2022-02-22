import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from "graphql-upload";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  //app.use("/graphql", LoggerMiddleware),
  app.use("/graphql",
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  await app.listen(process.env.API_SERVER_PORT || 5001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
