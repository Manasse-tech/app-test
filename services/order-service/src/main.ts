import { NestFactory } from '@nestjs/core';
import { validateConfig } from '@nsug/shared/config/environment';
import { OrderModule } from './infrastructure/config/order.module';

async function bootstrap(): Promise<void> {
  validateConfig();

  const app = await NestFactory.create(OrderModule);
  const port = process.env.PORT ?? 3003;
  await app.listen(port);
  console.log(`Order Service listening on port ${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start Order Service:', error);
  process.exit(1);
});
