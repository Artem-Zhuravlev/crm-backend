import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  method?: string;

  @ManyToOne(() => Client, (client) => client.payments, { onDelete: 'CASCADE' })
  client: Client;
}
