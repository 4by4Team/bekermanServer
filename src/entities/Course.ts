import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('double')
  price!: number;

  @Column()
  linkToCourse!: string; // נשלח במייל

  @Column()
  backgroundUrl!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'varchar' })
  createdBy!: string;

  @Column({ type: 'datetime' })
  updatedAt!: Date;

  @Column({ type: 'varchar' })
  updatedBy!: string;
}
