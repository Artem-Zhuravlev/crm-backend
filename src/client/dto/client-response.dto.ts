import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Client ID',
  })
  id: number;

  @ApiProperty({
    description: 'Client name',
    example: 'John Doe',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Client email',
    example: 'john@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Client phone',
    example: '+1234567890',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Notes about client',
    example: 'Important client',
  })
  notes?: string;
}
