import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './user.repository';
import UserSubscriber from 'src/core/subscribers/UserSubscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User, ConfigModule])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UserSubscriber,
  ],
  exports: [UserService],
})
export class UserModule {}
