import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  getAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.clientsService.findOne(id);
  }

  @Post()
  create(@Body() client: Partial<Client>) {
    return this.clientsService.create(client);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() client: Partial<Client>) {
    return this.clientsService.update(id, client);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clientsService.remove(id);
  }
}
