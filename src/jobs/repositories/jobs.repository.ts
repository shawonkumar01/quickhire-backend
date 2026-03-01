import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Job } from '../entities/jobs.entity';
import { CreateJobDto } from '../dto/create-jobs.dto';
import { QueryJobDto } from '../dto/query-jobs.dto';

@Injectable()
export class JobRepository {
  constructor(
    @InjectRepository(Job)
    private readonly repo: Repository<Job>,
  ) {}

  async create(dto: CreateJobDto): Promise<Job> {
    const job = this.repo.create(dto);
    return await this.repo.save(job);
  }

  async findAll(query: QueryJobDto): Promise<Job[]> {
    const { search, category, location } = query;

    const where: any = {};

    if (category) where.category = Like(`%${category}%`);
    if (location) where.location = Like(`%${location}%`);

    const jobs = await this.repo.find({
      where,
      order: { created_at: 'DESC' },
    });

    if (search) {
      const keyword = search.toLowerCase();
      return jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword),
      );
    }

    return jobs;
  }

  async findById(id: string): Promise<Job | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async delete(job: Job): Promise<void> {
    await this.repo.remove(job);
  }
}