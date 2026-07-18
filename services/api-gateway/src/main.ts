import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Module({})
class ApiGatewayModule {}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApiGatewayModule);
  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  console.log(`API Gateway service listening on port ${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start API Gateway service:', error);
  process.exit(1);
});
