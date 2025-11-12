import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApartmentImageDto } from './dto/create-apartment-image.dto';
import { UpdateApartmentImageDto } from './dto/update-apartment-image.dto';
import { QueryApartmentImageDto } from './dto/query-apartment-image.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Injectable()
export class ApartmentImageService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: QueryApartmentImageDto) {
    let { page, pageSize, filters: filtersStringJson } = query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;
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
    const apartmentImagePromise = this.prisma.apartment_images.findMany({
      skip: index,
      take: pageSize,
      where: {
        ...filters,
      },
    });
    const totalItemApartmentImage = this.prisma.apartment_images.count();
    const [apartmentImages, totalItem] = await Promise.all([
      apartmentImagePromise,
      totalItemApartmentImage,
    ]);
    const totalPage = Math.ceil(totalItem / pageSize);
    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      items: apartmentImages || [],
    };
  }
  async create(createApartmentImageDto: CreateApartmentImageDto) {
    return await this.prisma.apartment_images.create({
      data: createApartmentImageDto,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} apartmentImage`;
  }
  async findByApartmentId(apartment_id: number) {
    return await this.prisma.apartment_images.findMany({
      where: {
        apartment_id,
      },
    });
  }

  update(id: number, updateApartmentImageDto: UpdateApartmentImageDto) {
    return `This action updates a #${id} apartmentImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartmentImage`;
  }
}
