import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3002);

    exec('cd ../catch_data && npm run start:dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar catch_data: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`catch_data output:\n${stdout}`);
  });
}
bootstrap();
