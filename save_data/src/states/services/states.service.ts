import { Injectable } from '@nestjs/common';
import { AddOrUpdateStateUseCase } from '../application/use-cases/add-or-update-state.use-case';

@Injectable()
export class StatesService {
  constructor(private readonly useCase: AddOrUpdateStateUseCase) {}

  async addOrUpdateState(state: string, peopleCount: number): Promise<void> {
    await this.useCase.execute(state, peopleCount);
  }
}