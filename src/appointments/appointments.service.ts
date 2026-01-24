import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { clientId, ...data } = createAppointmentDto;

    const appointment = this.appointmentRepo.create({
      ...data,
      client: { id: clientId },
    });

    return this.appointmentRepo.save(appointment);
  }

  findAll() {
    return this.appointmentRepo.find({ relations: ['client'] });
  }

  findOne(id: number) {
    return this.appointmentRepo.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.appointmentRepo.update(id, updateAppointmentDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.appointmentRepo.delete(id);
  }
}
