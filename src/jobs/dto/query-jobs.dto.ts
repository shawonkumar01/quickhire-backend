import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryJobDto {
  @ApiPropertyOptional({ example: 'developer' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'Engineering' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'Dhaka' })
  @IsString()
  @IsOptional()
  location?: string;
}