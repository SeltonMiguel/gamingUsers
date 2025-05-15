import { Controller, Post, Body } from '@nestjs/common';
import { StatesService } from '../services/states.service';

@Controller('states')
export class StatesController {
    constructor(private readonly statesService: StatesService) {}

@Post('batch')
async processBatch(@Body() batch: { state: string; peopleCount: number }[]) {
    const processedStates = new Set<string>();

    for (const data of batch) {
        if (!processedStates.has(data.state)) {
            await this.statesService.addOrUpdateState(data.state, data.peopleCount);
            processedStates.add(data.state);
        } else {
            console.log(`[DEBUG] Estado ${data.state} ignorado por duplicidade no batch atual`);
        }
    }
    return { message: 'Batch processed successfully!' };
}

}