import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgresql://nsug_admin:nsug_secure_pass@localhost:5432/nsug_db?schema=public',
  entities: [
    'services/auth-service/src/infrastructure/persistence/**/*.entity.ts',
    'services/catalogue-service/src/infrastructure/persistence/**/*.entity.ts',
    'services/order-service/src/infrastructure/persistence/**/*.entity.ts',
    'services/payment-service/src/infrastructure/persistence/**/*.entity.ts',
  ],
  migrations: ['services/shared/src/database/migrations/**/*.ts'],
  subscribers: [],
  synchronize: false,
  logging: true,
  logger: 'advanced-console',
  migrationsRun: true,
  migrationsTransactionMode: 'each',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
