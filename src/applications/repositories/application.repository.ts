import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/applications.entity';
import { CreateApplicationDto } from '../dto/create-applications.dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectRepository(Application)
    private readonly repo: Repository<Application>,
  ) {}

  async create(dto: CreateApplicationDto): Promise<Application> {
    const application = this.repo.create(dto);
    return await this.repo.save(application);
  }

  async findByJobId(job_id: number): Promise<Application[]> {
    return await this.repo.find({
      where: { job_id },
      order: { created_at: 'DESC' },
    });
  }

  async findAll(): Promise<Application[]> {
    return await this.repo.find({
      relations: ['job'],
      order: { created_at: 'DESC' },
    });
  }
}