import { Module } from '@nestjs/common';
import { StatesModule } from './states/states.module';
import { MongoConfigModule } from './mongo.config';

@Module({
  imports: [StatesModule, MongoConfigModule],
})
export class AppModule {}