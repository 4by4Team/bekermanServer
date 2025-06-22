import { DataSource } from 'typeorm';
import { Article } from '../entities/Article';
import { Category } from '../entities/Category';
import { Testimony } from '../entities/Testimony';
import { Course } from '../entities/Course';

console.log(' Environment variables- data-source.ts',process.env.DB_HOST )

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Article, Category, Testimony, Course],

});
