import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  // exporting this makes it available to be imported from another module. Using @Global() above @Module make sit global everywhere 
  // but is a bad practice
  exports: [DatabaseService]
})
export class DatabaseModule {}
