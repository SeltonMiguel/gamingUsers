import { Injectable, OnModuleInit } from '@nestjs/common';
import { CsvReaderService } from './csv-reader/application/csv-reader.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly csvReader: CsvReaderService) {}

  async onModuleInit() {
    await this.csvReader.processCSV();
  }
}