import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CsvReaderService } from './csv-reader/application/csv-reader.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const csvReader = app.get(CsvReaderService);

  await csvReader.processCSV();

  await app.close();
}
bootstrap();