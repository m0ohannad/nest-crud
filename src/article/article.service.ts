import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DataSource } from 'typeorm';
import { Article } from './entities/article.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ArticleService {

  constructor(private readonly dataSource: DataSource) { }

  articleRepository = this.dataSource.getRepository(Article);

  create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  findAll() {
    return this.articleRepository.find();
  }

  findOne(id: number) {
    return this.articleRepository.findOneBy({ id: id });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto);
    return { message: `Article #${id} updated successfully` };
  }

  async remove(id: number) {
    await this.articleRepository.delete(id);
    return { message: `Article #${id} deleted successfully` };
  }

  async seedArticles() {
    const articles = Array.from({ length: 10 }, () => ({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
    }));
    await this.articleRepository.save(articles);
    return { message: "Database seeded successfully" };
  }
}
