import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { State } from '../../schemas/state.schema';
import { StateRepository } from '../../domain/repositories/state.repository';

@Injectable()
export class StateRepositoryImpl implements StateRepository {
  constructor(
    @InjectModel('State') private readonly stateModel: Model<State>,
  ) {}

  async findByState(state: string): Promise<State | null> {
    return this.stateModel.findOne({ state });
  }

  async create(state: string, peopleCount: number): Promise<State> {
    const created = new this.stateModel({ state, totalPeople: peopleCount });
    return created.save();
  }

  async save(state: State): Promise<void> {
    await state.save();
  }
}
