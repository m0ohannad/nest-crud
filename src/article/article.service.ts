import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Article } from './entities/article.entity';
import { PageService } from '../common/services/page.service';
import { GenericFilter } from '../common/dto/generic-filter.dto';

@Injectable()
export class ArticleService extends PageService {
  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>,
  ) {
    super();
  }

  async findAllPaginated(filter: GenericFilter & Partial<Article>) {
    const { ...params } = filter;

    return await this.paginate(
      this.repository,
      filter,
      this.createWhereQuery(params),
    );
  }

  private createWhereQuery(params: Partial<Article>) {
    const where: any = {};

    if (params.title) {
      where.title = ILike(`%${params.title}%`);
    }

    if (params.body) {
      where.body = ILike(`%${params.body}%`);
    }

    return where;
  }
}