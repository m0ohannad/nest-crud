import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'masar-blog-db',
      autoLoadEntities: true,
      entities: [entitiesPath],
      synchronize: false,
      logging: false,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
