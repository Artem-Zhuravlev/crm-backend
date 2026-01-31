import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Client full name',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiPropertyOptional({
    description: 'Client email',
    example: 'john@example.com',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Client phone number',
    example: '+1234567890',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Additional notes about the client',
    example: 'VIP client',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
