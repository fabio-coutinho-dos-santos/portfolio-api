import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';

// export function getDataSourceConfig(configService) {
//   return {
//     type: 'postgres',
//     url: configService.get('POSTGRES_URL_LOCAL'),
//     synchronize: false,
//     logging: true,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//     entities: [__dirname + '/../**/*.entity.js'],
//     migrations: ['dist/migrations/*.js'],
//   };
// }

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL_LOCAL,
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
