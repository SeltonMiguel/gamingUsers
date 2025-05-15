import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { StateRepository } from '../../domain/repositories/state.repository';

@Injectable()
export class AddOrUpdateStateUseCase {
    constructor(@Inject('StateRepository') private readonly repository: StateRepository) {}

    async execute(state: string, peopleCount: number): Promise<void> {
        console.log(`[DEBUG] Recebido: state=${state}, peopleCount=${peopleCount}`);

        if (isNaN(peopleCount)) {
            throw new BadRequestException(`Valor inválido para 'peopleCount': ${peopleCount}`);
        }

        const existing = await this.repository.findByState(state);

    if (existing) {
        existing.totalPeople = peopleCount;
        await this.repository.save(existing);
    } else {
        await this.repository.create(state, peopleCount);
    }
    }
}