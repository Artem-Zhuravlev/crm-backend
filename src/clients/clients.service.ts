import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  private toResponseDto(client: Client): ClientResponseDto {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      notes: client.notes,
    };
  }

  async findOne(id: number): Promise<ClientResponseDto> {
    const client = await this.clientRepo.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return this.toResponseDto(client);
  }

  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.clientRepo.find();
    return clients.map(this.toResponseDto);
  }

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    const client = this.clientRepo.create(createClientDto);
    const saved = await this.clientRepo.save(client);
    return this.toResponseDto(saved);
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    await this.clientRepo.update(id, updateClientDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.clientRepo.delete(id);
  }
}
