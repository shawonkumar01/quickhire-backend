import { Injectable, NotFoundException } from '@nestjs/common';
import { Job } from './entities/jobs.entity';
import { JobRepository } from './repositories/jobs.repository';
import { CreateJobDto } from './dto/create-jobs.dto';
import { QueryJobDto } from './dto/query-jobs.dto';

@Injectable()
export class JobsService {
  constructor(private readonly jobRepository: JobRepository) {}

  async create(dto: CreateJobDto): Promise<Job> {
    return await this.jobRepository.create(dto);
  }

  async findAll(query: QueryJobDto): Promise<Job[]> {
    return await this.jobRepository.findAll(query);
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findById(id);

    if (!job) {
      throw new NotFoundException(`Job with ID "${id}" not found`);
    }

    return job;
  }

  async remove(id: string): Promise<{ message: string }> {
    const job = await this.findOne(id);
    await this.jobRepository.delete(job);
    return { message: `Job "${job.title}" deleted successfully` };
  }
}