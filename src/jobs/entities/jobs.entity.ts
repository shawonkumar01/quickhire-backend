import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  category: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  salary: string;

  @Column({ nullable: true })
  jobType: string;

  @CreateDateColumn()
  created_at: Date;
}