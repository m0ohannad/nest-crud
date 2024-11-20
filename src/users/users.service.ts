import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from './entities/user.entity';
import { PageService } from '../common/services/page.service';
import { GenericFilter } from '../common/dto/generic-filter.dto';

@Injectable()
export class UsersService extends PageService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super();
  }

  async findAllPaginated(filter: GenericFilter & Partial<User>) {
    const { ...params } = filter;

    return await this.paginate(
      this.repository,
      filter,
      this.createWhereQuery(params),
    );
  }

  private createWhereQuery(params: Partial<User>) {
    const where: any = {};

    if (params.firstName) {
      where.firstName = ILike(`%${params.firstName}%`);
    }

    if (params.lastName) {
      where.lastName = ILike(`%${params.lastName}%`);
    }

    if (params.email) {
      where.email = ILike(`%${params.email}%`);
    }

    return where;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { id } });
  }
}