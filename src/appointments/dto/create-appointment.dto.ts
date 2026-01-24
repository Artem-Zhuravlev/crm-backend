import {
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsNumber()
  clientId: number;
}
