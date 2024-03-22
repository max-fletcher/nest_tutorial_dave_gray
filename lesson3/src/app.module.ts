import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule,
    // Defining throttle/rate-limit logic globally. You can define multiple rate-limits here each with their own set of names and 
    // apply them to different routes(see docs).
    ThrottlerModule.forRoot([
      // DEFAULT RATE LIMITERS. HAVEN'T FOUND A WAY TO OVERRIDE THEM USING @SkipThrottle
      {
        // ttl: 1000,
        ttl: 60000,
        limit: 5
      },

      // NAMED RATE LIMITERS. HAVEN'T FOUND A WAY TO SKIP THEM USING @SkipThrottle
      // {
      //   // this meant that the modules will accept 3 requests in 60 seconds(i.e 60000 ms)
      //   name: 'short',
      //   // ttl: 1000,
      //   ttl: 60000,
      //   limit: 2
      // },
      // {
      //   // this meant that the modules will accept 3 requests in 60 seconds(i.e 60000 ms)
      //   name: 'long',
      //   ttl: 60000,
      //   // limit: 100
      //   limit: 5
      // }
    ])
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    // this binds the throttle/rate-limiter guard globally. You can bind it in many ways though(see docs).
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
