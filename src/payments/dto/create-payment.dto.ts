import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDateString, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Payment amount', example: 150.5 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Payment date', example: '2026-01-24T12:00:00Z' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ description: 'Payment method', example: 'card' })
  @IsOptional()
  @IsString()
  method?: string;

  @ApiProperty({ description: 'ID of the client', example: 1 })
  @IsNumber()
  clientId: number;
}
