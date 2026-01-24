import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => Appointment, (appt) => appt.client)
  appointments: Appointment[];

  @OneToMany(() => Payment, (payment) => payment.client)
  payments: Payment[];
}
