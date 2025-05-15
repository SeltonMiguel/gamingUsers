import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class DataSenderService {
    private readonly saveDataUrl: string;

    constructor(private configService: ConfigService) {
        const url = this.configService.get<string>('SAVE_DATA_URL');
        if (!url) {
            throw new Error('A variável de ambiente SAVE_DATA_URL não está definida.');
        }
        this.saveDataUrl = url;
    }

    async sendBatch(batch: any[]): Promise<void> {
        try {
            const response = await axios.post(`${this.saveDataUrl}/batch`, batch);
            console.log(`Batch enviado com sucesso: status ${response.status}`);
        } catch (error) {
            console.error(`Erro ao enviar batch:`, error.response?.status || error.message);
            throw error;
        }
    }
}