import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export class PostRepository extends Repository<Post> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(Post, datasource.createEntityManager());
  }

  async findAllPost() {
    return await this.find();
  }

  async findOnePostById(id: string): Promise<Post> {
    return await this.createQueryBuilder('post')
      .where('post.id = :id', { id })
      .getOne();
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return await this.save(createPostDto);
  }

  async updatePost(id, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.save(updatePostDto);
  }

  async removeUser(id: string): Promise<DeleteResult> {
    return await this.softDelete(id);
  }
}
