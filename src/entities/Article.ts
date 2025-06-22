import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  backgroundUrl!: string;

  @Column('text')
  content!: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'varchar' })
  createdBy!: string;

  @Column({ type: 'datetime' })
  updatedAt!: Date;

  @Column({ type: 'varchar' })
  updatedBy!: string;
}
