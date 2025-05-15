import { State } from '../../schemas/state.schema';
export interface StateRepository {
  findByState(state: string): Promise<State | null>;
  create(state: string, peopleCount: number): Promise<State>;
  save(state: State): Promise<void>;
}
