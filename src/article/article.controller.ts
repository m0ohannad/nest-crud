import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { GenericFilter } from '../common/dto/generic-filter.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(@Query() filter: GenericFilter) {
    return this.articleService.findAllPaginated(filter);
  }
}