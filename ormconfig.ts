import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  // ssl: true,
  // url:
  //   NODE_ENV === 'test'
  //     ? process.env.POSTGRES_TEST_URL_CONNECTION
  //     : process.env.POSTGRES_URL_CONNECTION,
  // url: process.env.POSTGRES_URL_CONNECTION,
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/entity/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  // subscribers: ['dist/observers/subscribers/*.subscriber.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
