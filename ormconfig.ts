import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';

export function ormConfig(configService): any {
  return {
    type: 'mongodb',
    url: configService.get('MONGO_URL_CONNECTION'),
    synchronize: false,
    logging: false,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    entities: [__dirname + '/../**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
  };
}

const dataSource = new DataSource(ormConfig(new ConfigService()));
export default dataSource;
