import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: false,
  })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @Column()
  avatar: string;
}
