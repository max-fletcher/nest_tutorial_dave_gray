import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// USE THIS IF YOU WANT TO IPMLEMENT THE CUSTOM LOGGER YOU MADE GLOBALLY (1)
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, 
    // USE THIS IF YOU WANT TO IPMLEMENT THE CUSTOM LOGGER YOU MADE GLOBALLY (2)
    // { 
    //   // 'bufferLogs' is to make sure what we define here runs with a bit of buffer(i.e make sure the service is instantiated) 
    //   // because it is outside of any modules
    //   bufferLogs:  true
    // }
  );

  // USE THIS IF YOU WANT TO IPMLEMENT THE CUSTOM LOGGER YOU MADE GLOBALLY(3)
  // attach the 'MyLoggerService' we created to the app globally(i.e all routes, function etc.)
  // app.useLogger(app.get(MyLoggerService))

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
