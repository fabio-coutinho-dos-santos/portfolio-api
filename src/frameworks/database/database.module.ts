import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { getDataSourceConfig } from '../../../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('POSTGRES_URL_LOCAL'),
        synchronize: false,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [__dirname + '/../**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
