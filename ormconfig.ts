import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'masar-blog-db',
  synchronize: true,
  migrations: ['./src/migration/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export const initializeDataSource = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
};

export default dataSource;