import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty({ example: 1, description: 'Payment ID' })
  id: number;

  @ApiProperty({ example: 100.5, description: 'Payment amount' })
  amount: number;

  @ApiProperty({
    example: '2026-01-31T12:00:00Z',
    description: 'Payment date/time',
  })
  date: string;

  @ApiPropertyOptional({
    example: 'credit_card',
    description: 'Payment method',
    nullable: true,
  })
  method?: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the client who made the payment',
  })
  clientId: number;
}
