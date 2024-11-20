import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Follower } from './follower.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Follower, follower => follower.follower)
  followers: Follower[];

  @OneToMany(() => Follower, follower => follower.following)
  following: Follower[];
}