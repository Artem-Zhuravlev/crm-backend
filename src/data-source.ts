import { DataSource } from 'typeorm';
import { Client } from './clients/entities/client.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { Payment } from './payments/entities/payment.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'crm.db',
  entities: [Client, Appointment, Payment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
