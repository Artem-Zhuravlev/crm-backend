import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  private toResponseDto(payment: Payment): PaymentResponseDto {
    return {
      id: payment.id,
      amount: payment.amount,
      date: payment.date.toISOString(),
      method: payment.method,
      clientId: payment.client.id,
    };
  }

  async create(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    const payment = this.paymentRepo.create(createPaymentDto);
    const saved = await this.paymentRepo.save(payment);
    return this.toResponseDto(saved);
  }

  async findAll(): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentRepo.find({ relations: ['client'] });
    return payments.map(this.toResponseDto);
  }

  async findOne(id: number): Promise<PaymentResponseDto> {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!payment)
      throw new NotFoundException(`Payment with id ${id} not found`);
    return this.toResponseDto(payment);
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentResponseDto> {
    await this.paymentRepo.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.paymentRepo.delete(id);
  }
}
