import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Testimony {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  testimonyName!: string;

  @Column()
  linkToYoutube!: string;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'varchar' })
  createdBy!: string;

  @Column({ type: 'datetime' })
  updatedAt!: Date;

  @Column({ type: 'varchar' })
  updatedBy!: string;
}
