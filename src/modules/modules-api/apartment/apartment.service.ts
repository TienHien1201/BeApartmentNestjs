import { BadRequestException, Body, Get, Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { QueryApartmentDto } from './dto/query-apartment.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class ApartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryApartmentDto) {
    let { page, pageSize, filters: filtersStringJson } = query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 3;
    const filters = JSON.parse(filtersStringJson || '{}') || {};

    const index = (page - 1) * pageSize;

    Object.entries(filters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        delete filters[key];
        return;
      }
      if (typeof value === 'string') {
        filters[key] = {
          contains: value,
        };
      }
    });

    const apartmentsPromise = this.prisma.apartments.findMany({
      skip: index,
      take: pageSize,
      where: {
        ...filters,
      },
    });
    const totalItemApartment = this.prisma.apartments.count();
    const [apartments, totalItem] = await Promise.all([
      apartmentsPromise,
      totalItemApartment,
    ]);
    const totalPage = Math.ceil(totalItem / pageSize);
    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      items: apartments || [],
    };
  }
  create(createApartmentDto: CreateApartmentDto) {
    return 'This action adds a new apartment';
  }
  async findOne(id: number) {
    const apartmentExits = await this.prisma.apartments.findUnique({
      where: {
        id: id,
      },
    });
    if (!apartmentExits) {
      throw new BadRequestException('Chung cư không tồn tại!');
    }
    return apartmentExits;
  }

  update(id: number, updateApartmentDto: UpdateApartmentDto) {
    return `This action updates a #${id} apartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartment`;
  }
}
