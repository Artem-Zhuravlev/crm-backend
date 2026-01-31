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
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOkResponse({ type: ClientResponseDto, isArray: true })
  getAll(): Promise<ClientResponseDto[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: ClientResponseDto })
  getOne(@Param('id') id: number): Promise<ClientResponseDto> {
    return this.clientsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ClientResponseDto })
  create(@Body() client: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.create(client);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: ClientResponseDto })
  update(
    @Param('id') id: number,
    @Body() client: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    return this.clientsService.update(id, client);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Client successfully deleted' })
  delete(@Param('id') id: number) {
    return this.clientsService.remove(id);
  }
}
