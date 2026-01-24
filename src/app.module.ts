import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from './clients/clients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';

import { Client } from './clients/entities/client.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { Payment } from './payments/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'crm.db',
      entities: [Client, Appointment, Payment],
      synchronize: true,
    }),
    ClientsModule,
    AppointmentsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
