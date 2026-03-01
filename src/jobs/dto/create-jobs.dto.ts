import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Backend Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Qtec Solution Ltd' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Engineering' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'We are looking for a skilled Backend developer...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: '50,000 - 80,000 BDT' })
  @IsString()
  @IsOptional()
  salary?: string;

  @ApiPropertyOptional({ example: 'full-time' })
  @IsString()
  @IsOptional()
  jobType?: string;
}