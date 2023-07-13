import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hanshSync, genSaltHashSync } from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
