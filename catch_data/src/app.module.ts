import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CsvReaderService } from './csv-reader/application/csv-reader.service';

import { AxiosProvider } from './csv-reader/infrastructure/axios.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, CsvReaderService, AxiosProvider],
})
export class AppModule {}