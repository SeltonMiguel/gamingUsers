import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatesController } from './controllers/states.controller';
import { StatesService } from './services/states.service';
import { State, StateSchema } from './schemas/state.schema';
import { AddOrUpdateStateUseCase } from './application/use-cases/add-or-update-state.use-case';
import { StateRepositoryImpl } from './infrastructure/repositories/state.repository.impl';
import { StateRepository } from './domain/repositories/state.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'State', schema: StateSchema }]),
  ],
  controllers: [StatesController],
  providers: [
    StatesService,
    AddOrUpdateStateUseCase,
    {
      provide: 'StateRepository',
      useClass: StateRepositoryImpl,
    },
  ],
})
export class StatesModule {}