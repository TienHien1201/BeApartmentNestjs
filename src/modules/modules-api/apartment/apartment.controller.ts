import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  Req,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { MessageResonse } from 'src/common/decorator/message-response.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { QueryApartmentDto } from './dto/query-apartment.dto';
import type { users } from 'generated/prisma';
import { User } from 'src/common/decorator/user.decorator';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post('create')
  @MessageResonse('Create apartmet success')
  @ApiBearerAuth()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.create(createApartmentDto);
  }

  @Get()
  @MessageResonse('Get apartment success')
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', example: 1, required: true })
  @ApiQuery({ name: 'pageSize', example: 3, required: true })
  @ApiQuery({
    name: 'filters',
    required: false,
    example: '{"apartment_name":"Căn hộ"}',
    description: 'Bộ lọc JSON, ví dụ: {"apartment_name":"Căn hộ"}',
  })
  findAll(@Query() query: QueryApartmentDto) {
    return this.apartmentService.findAll(query);
  }

  @Get(':id')
  @MessageResonse('find Apartment Success')
  findOne(@Param('id') id: number) {
    return this.apartmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
  ) {
    return this.apartmentService.update(+id, updateApartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentService.remove(+id);
  }
}
