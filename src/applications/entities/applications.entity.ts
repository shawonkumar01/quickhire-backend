import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn} from 'typeorm';
import { Job } from '../../jobs/entities/jobs.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  resume_link: string;

  @Column('text', { nullable: true })
  cover_note: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;
}