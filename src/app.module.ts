import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './frameworks/database/database.module';
import { UserModule } from './use-cases/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
