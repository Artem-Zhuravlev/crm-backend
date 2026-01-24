import { IsNumber, IsOptional, IsDateString, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsNumber()
  clientId: number;
}
