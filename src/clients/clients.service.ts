import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  findAll() {
    return this.clientRepo.find();
  }

  findOne(id: number) {
    return this.clientRepo.findOneBy({ id });
  }

  create(client: Partial<Client>) {
    const newClient = this.clientRepo.create(client);
    return this.clientRepo.save(newClient);
  }

  update(id: number, data: Partial<Client>) {
    return this.clientRepo.update(id, data);
  }

  remove(id: number) {
    return this.clientRepo.delete(id);
  }
}
