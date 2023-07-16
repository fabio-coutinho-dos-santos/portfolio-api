import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  roles: string;

  @Column({ nullable: true })
  role: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  test: string;
}
