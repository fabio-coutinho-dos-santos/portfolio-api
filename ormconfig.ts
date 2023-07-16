import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'dpg-cink4slph6ei90f5h8dg-a.oregon-postgres.render.com',
  port: 5432,
  username: 'fabio',
  password: 'NV6PDSE4UlIamGgiwh0wZFBf4bEJbTaw',
  database: 'portfolio_pbmp',
  // ssl: true,
  // url:
  //   NODE_ENV === 'test'
  //     ? process.env.POSTGRES_TEST_URL_CONNECTION
  //     : process.env.POSTGRES_URL_CONNECTION,
  // url: process.env.POSTGRES_URL_CONNECTION,
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/entity/*.entity.js'],
  // entities: ['src/core/entities/user.entity.ts'],
  migrations: ['./migrations'],
  // subscribers: ['dist/observers/subscribers/*.subscriber.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
