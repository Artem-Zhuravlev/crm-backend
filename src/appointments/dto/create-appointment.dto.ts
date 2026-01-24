import {
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Title of the appointment',
    example: 'Meeting with client',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the appointment',
    example: 'Discuss contract',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Date and time of the appointment',
    example: '2026-01-24T12:00:00Z',
  })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({
    description: 'Whether the appointment is completed',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({ description: 'ID of the client', example: 1 })
  @IsNumber()
  clientId: number;
}
