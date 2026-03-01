import {Controller,Post,Get,Body,Param,HttpCode,HttpStatus,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-applications.dto';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // POST /api/applications
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }

  // GET /api/applications
  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  // GET /api/applications/job/:job_id
  @Get('job/:job_id')
  findByJobId(@Param('job_id') job_id: string) {
    return this.applicationsService.findByJobId(+job_id);
  }
}