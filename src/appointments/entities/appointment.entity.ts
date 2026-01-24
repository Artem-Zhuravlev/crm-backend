import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @ManyToOne(() => Client, (client) => client.appointments, {
    onDelete: 'CASCADE',
  })
  client: Client;
}
