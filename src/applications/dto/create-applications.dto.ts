import {IsString,IsNotEmpty,IsEmail,IsUrl,IsOptional,IsNumber} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  job_id: number;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'https://drive.google.com/myresume' })
  @IsUrl()
  @IsNotEmpty()
  resume_link: string;

  @ApiPropertyOptional({ example: 'I am very interested in this position...' })
  @IsString()
  @IsOptional()
  cover_note?: string;
}