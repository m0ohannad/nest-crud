import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'follower' })
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.followers)
  follower: User;

  @ManyToOne(() => User, user => user.following)
  following: User;
}