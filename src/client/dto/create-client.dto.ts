import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ description: 'Client name', example: 'John Doe' })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiPropertyOptional({
    description: 'Client email',
    example: 'john@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Client phone', example: '+1234567890' })
  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Notes about client',
    example: 'Important client',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
