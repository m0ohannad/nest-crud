import { Controller, Post } from '@nestjs/common';
import { SeedersService } from './seeders.service';

@Controller('seeders')
export class SeedersController {
  constructor(private readonly seedersService: SeedersService) {}

  @Post()
  async runSeeders(): Promise<string> {
    await this.seedersService.runSeeders();
    return 'Seeding complete!';
  }
}