import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Follower } from './entities/follower.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followers = await this.followerRepository.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });
    return followers.map(f => f.follower);
  }

  async getFollowing(userId: string): Promise<User[]> {
    const following = await this.followerRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });
    return following.map(f => f.following);
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}