import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // when this module is initialized, this will asynchronously try to connect to the database
  // also, since we are using await here, we won't need to further use await when we are executing DB calls using prisma from other files
  async onModuleInit() {
    await this.$connect()
  }
}
