import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostsModel from './posts/entities/posts.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      //데이터베이스 타입
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // 민감한 정보는 환경변수에 작성하기
      password: 'postgres',
      database: 'postgres',
      entities: [
        PostsModel,
      ],
      synchronize: true, // 운영 환경에서는 false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
