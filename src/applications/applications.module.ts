import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/applications.entity';
import { ApplicationRepository } from './repositories/application.repository';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    JobsModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationRepository],
})
export class ApplicationsModule {}