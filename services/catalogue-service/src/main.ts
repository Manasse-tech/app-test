import { NestFactory } from '@nestjs/core';
import { validateConfig } from '@nsug/shared/config/environment';
import { CatalogueModule } from './infrastructure/config/catalogue.module';

async function bootstrap(): Promise<void> {
  validateConfig();

  const app = await NestFactory.create(CatalogueModule);
  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  console.log(`Catalogue Service listening on port ${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start Catalogue Service:', error);
  process.exit(1);
});
