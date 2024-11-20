import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Follower } from '../users/entities/follower.entity';
import * as bcrypt from 'bcrypt';

export class UserSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const followerRepository = dataSource.getRepository(Follower);

    const users = [
      { email: 'user1@example.com', password: 'password123', firstName: 'User', lastName: 'One' },
      { email: 'user2@example.com', password: 'password123', firstName: 'User', lastName: 'Two' },
      { email: 'user3@example.com', password: 'password123', firstName: 'User', lastName: 'Three' },
    ];

    const savedUsers = [];

    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User();
      user.email = userData.email;
      user.password = hashedPassword;
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      savedUsers.push(await userRepository.save(user));
    }

    // جعل المستخدمين يتابعون بعضهم
    const followRelations = [
      { follower: savedUsers[0], following: savedUsers[1] },
      { follower: savedUsers[1], following: savedUsers[2] },
      { follower: savedUsers[2], following: savedUsers[0] },
    ];

    for (const relation of followRelations) {
      const follower = new Follower();
      follower.follower = relation.follower;
      follower.following = relation.following;
      await followerRepository.save(follower);
    }
  }
}