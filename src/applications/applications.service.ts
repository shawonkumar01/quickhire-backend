import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationRepository } from './repositories/application.repository';
import { CreateApplicationDto } from './dto/create-applications.dto';
import { Application } from './entities/applications.entity';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly jobsService: JobsService,
  ) {}

  async create(dto: CreateApplicationDto): Promise<Application> {
    await this.jobsService.findOne(dto.job_id);
    return await this.applicationRepository.create(dto);
  }

  async findByJobId(job_id: number): Promise<Application[]> {
    await this.jobsService.findOne(job_id);
    return await this.applicationRepository.findByJobId(job_id);
  }

  async findAll(): Promise<Application[]> {
    return await this.applicationRepository.findAll();
  }
}