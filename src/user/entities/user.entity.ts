import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../config/enum/role.enum';
import { Timestamp } from '../../config/utils/timestamp.util';

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
}
