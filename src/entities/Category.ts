import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  categoryName!: string;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'varchar' })
  createdBy!: string;

  @Column({ type: 'datetime' })
  updatedAt!: Date;

  @Column({ type: 'varchar' })
  updatedBy!: string;
}
