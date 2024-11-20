import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { GenericFilter } from '../common/dto/generic-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() filter: GenericFilter) {
    return this.usersService.findAllPaginated(filter);
  }
}