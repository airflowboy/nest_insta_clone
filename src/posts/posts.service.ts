import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import PostsModel from "./entities/posts.entity";
import { InjectRepository } from "@nestjs/typeorm";

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_Official',
    title: '뉴진스 민지',
    content: '메이크업 고치는 민지',
    likeCount: 100000,
    commentCount: 100000,
  },
  {
    id: 2,
    author: 'newjeans_Official',
    title: '뉴진스 해린',
    content: '노래연습하는 민지',
    likeCount: 100000,
    commentCount: 100000,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제',
    content: '종합운동장에서 노래하는 로제',
    likeCount: 100000,
    commentCount: 100000,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPost() {
    return await this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException();
    return post;
  }

  async createPosts(author: string, title: string, content: string) {
    // 1. create -> 저장할 객체를 생성
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    // 2. save -> 객체를 저장 (create 메서드에서 생성한 객체를 저장한다.)
    return await this.postsRepository.save(post);
  }

  async updatePosts(postId: number, author: string, title: string, content: string) {
    // save의 기능
    // 1. 만약에 데이터가 존재하지 않는다면 (id 기준) -> 새로 생성한다.
    // 2. 만약에 데이터가 존재한다면 (id 기준) -> 기존값을 수정한다.
    const post = await this.postsRepository.findOne({
      where: {
        id:postId,
      },
    });

    if (!post) throw new NotFoundException();
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    return await this.postsRepository.save(post);
  }

  async deletePosts(postId: number) {
    const post = this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new NotFoundException();
    return await this.postsRepository.delete(postId);
  }
}
