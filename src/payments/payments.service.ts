import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { clientId, ...data } = createPaymentDto;

    const payment = this.paymentRepo.create({
      ...data,
      client: { id: clientId },
    });

    return this.paymentRepo.save(payment);
  }

  findAll() {
    return this.paymentRepo.find({ relations: ['client'] });
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({ where: { id }, relations: ['client'] });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentRepo.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.paymentRepo.delete(id);
  }
}
