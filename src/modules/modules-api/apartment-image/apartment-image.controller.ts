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
import { ApartmentImageService } from './apartment-image.service';
import { CreateApartmentImageDto } from './dto/create-apartment-image.dto';
import { UpdateApartmentImageDto } from './dto/update-apartment-image.dto';
import { MessageResonse } from 'src/common/decorator/message-response.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryApartmentImageDto } from './dto/query-apartment-image.dto';
import { User } from 'src/common/decorator/user.decorator';
import type { users } from 'generated/prisma';

@Controller('apartment-image')
export class ApartmentImageController {
  constructor(private readonly apartmentImageService: ApartmentImageService) {}

  @Post()
  create(@Body() createApartmentImageDto: CreateApartmentImageDto) {
    return this.apartmentImageService.create(createApartmentImageDto);
  }

  @Get('')
  @MessageResonse('Get Apartment Image Success')
  @ApiBearerAuth()
  findAll(
    @Query() query: QueryApartmentImageDto,
    @Param() param,
    @Headers() header,
    @Req() req,
    @User() user: users,
  ) {
    return this.apartmentImageService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmentImageService.findOne(+id);
  }
  @Get('apartment/:aparmentId')
  @MessageResonse('Find Image Of Apartment Success')
  findImageInApartment(@Param('aparmentId') aparmentId: number) {
    return this.apartmentImageService.findByApartmentId(+aparmentId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApartmentImageDto: UpdateApartmentImageDto,
  ) {
    return this.apartmentImageService.update(+id, updateApartmentImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentImageService.remove(+id);
  }
}
