import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // These needs to be here between the lines above and below since NestFactory.create creates
  // the app instance and app.listen mounts the app to the designated port so these middleware need to be attached after instantiation and before mounting
  // This sets a global prefix to all routes. 
  app.setGlobalPrefix('api')
  // Sets cors to the nest application
  app.enableCors({
    // add multiple origins here
    origin: [
      "http://localhost:3000/",
      // "https://thriveread.com/",
      // "http://yourclient.com",
    ],
  });
  await app.listen(3000);
}
bootstrap();
