import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto) {
    try {
      return await this.postRepository.createPost(createPostDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async findAll() {
    try {
      return await this.postRepository.findAllPost();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.findOne(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      return await this.postRepository.updatePost(id, updatePostDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async remove(id: string) {
    try {
      return await this.postRepository.removeUser(id);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
