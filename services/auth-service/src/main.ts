import { NestFactory } from '@nestjs/core';
import { validateConfig } from '@nsug/shared/config/environment';
import { AuthModule } from './infrastructure/config/auth.module';

async function bootstrap(): Promise<void> {
  validateConfig();

  const app = await NestFactory.create(AuthModule);
  const PORT = process.env.PORT ?? 3001;
  await app.listen(PORT);
  console.log(`Auth Service listening on port ${PORT}`);
}

bootstrap().catch((err: unknown) => {
  console.error('Failed to start Auth Service:', err);
  process.exit(1);
});
