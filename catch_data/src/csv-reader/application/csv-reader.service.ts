import { Injectable, Logger, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';
import axios from 'axios';
type AxiosInstance = typeof axios;
import { PersonData } from '../domain/person-data.interface';

interface BatchItem {
  state: string;
  peopleCount: number;
}

@Injectable()
export class CsvReaderService {
  private readonly logger = new Logger(CsvReaderService.name);

  constructor(
    @Inject('AXIOS_INSTANCE') private readonly axiosInstance: AxiosInstance,
  ) {}

  async processCSV(): Promise<void> {
    const filePath = path.join(__dirname, '../../../src/data/phone_data.csv');
    const stateCounts: Record<string, number> = {};

    await this.readCsvFile(filePath, stateCounts);

    const batchData = this.buildBatchData(stateCounts);
    this.logger.log(`Leitura concluída. Total estados únicos: ${batchData.length}`);

    await this.sendBatch(batchData, 1);
  }

  private readCsvFile(filePath: string, stateCounts: Record<string, number>): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          const cleanedRow = this.cleanRow(row);
          if (cleanedRow) {
            stateCounts[cleanedRow.state] = (stateCounts[cleanedRow.state] || 0) + 1;
          }
        })
        .on('end', () => resolve())
        .on('error', (err) => {
          this.logger.error('Erro ao ler o CSV:', err);
          reject(err);
        });
    });
  }

  private buildBatchData(stateCounts: Record<string, number>): BatchItem[] {
    return Object.entries(stateCounts).map(([state, count]) => ({
      state,
      peopleCount: count,
    }));
  }

  private async sendBatch(data: BatchItem[], batchNumber: number): Promise<void> {
    this.logger.log(`Enviando batch #${batchNumber} com ${data.length} registros`);
    try {
      const response = await this.axiosInstance.post('/states/batch', data);
      this.logger.log(`Batch #${batchNumber} enviado com sucesso (status ${response.status})`);
    } catch (err: any) {
      this.logger.error(`Erro ao enviar batch #${batchNumber}:`, err.response?.status || err.message || err);
    }
    await new Promise((res) => setTimeout(res, 1000));
  }

  private cleanRow(row: any): PersonData | null {
    const { id, name, phone, state } = row;
    if (!id || isNaN(Number(id)) || !name || !phone || !state || state.length !== 2) {
      return null;
    }
    return {
      id: Number(id),
      name: name.trim(),
      phone: phone.trim(),
      state: state.toUpperCase().trim(),
    };
  }
}