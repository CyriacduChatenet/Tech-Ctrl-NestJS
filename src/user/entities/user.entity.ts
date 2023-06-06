import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../config/enum/role.enum';
import { Timestamp } from '../../config/utils/timestamp.util';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false,
  })
  roles: Role;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
