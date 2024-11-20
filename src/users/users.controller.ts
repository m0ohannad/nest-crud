import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id/followers')
  async getFollowers(@Param('id') id: string): Promise<User[]> {
    return this.usersService.getFollowers(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/following')
  async getFollowing(@Param('id') id: string): Promise<User[]> {
    return this.usersService.getFollowing(id);
  }

  @UseGuards(JwtGuard)
  @Get('myProfile')
  async getMyProfile(@Req() req): Promise<User> {
    return this.usersService.findOneById(req.user.id);
  }
}