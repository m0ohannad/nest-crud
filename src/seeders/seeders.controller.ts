import { Controller, Post } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

@Controller('seeders')
export class SeedersController {
  constructor(
    private readonly seedersService: SeedersService,
    private readonly dataSource: DataSource,
  ) { }

  @Post()
  async runSeeders(): Promise<string> {
    await this.seedersService.runSeeders();
    return 'Seeding complete!';
  }

  @Post('/fillUser')
  async fillCustomers() {
    const usersRepo: Repository<User> = this.dataSource.getRepository(User);

    // Choose a suitable chunk size
    const chunkSize = 10;
    const totalUsers = 1_000;
    const users = [];

    for (let i = 0; i < totalUsers; i++) {
      const randomFirstName = faker.person.firstName();
      const randomLastName = faker.person.lastName();
      const randomEmail = faker.internet.email();
      const randomPassword = await bcrypt.hash('password123', 10); // Example password

      users.push({
        firstName: randomFirstName,
        lastName: randomLastName,
        email: randomEmail,
        password: randomPassword,
      });

      // Insert in chunks
      if (users.length === chunkSize) {
        console.log('Inserting chunk Number:', i / chunkSize);
        console.log('Percentage done:', (i / totalUsers) * 100 + '%');
        await usersRepo.insert(users);
        users.length = 0; // clear the array
      }
    }

    // Insert any remaining users
    if (users.length > 0) {
      await usersRepo.insert(users);
    }

    return 'done';
  }
}