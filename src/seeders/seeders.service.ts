import { Injectable } from '@nestjs/common';
import dataSource, { initializeDataSource } from '../../ormconfig';
import { UserSeeder } from './user-seeder';

@Injectable()
export class SeedersService {
  async runSeeders(): Promise<void> {
    await initializeDataSource();
    const userSeeder = new UserSeeder();
    await userSeeder.run(dataSource);
    await dataSource.destroy();
  }
}