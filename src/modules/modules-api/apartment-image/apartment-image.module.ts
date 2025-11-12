import { Module } from '@nestjs/common';
import { ApartmentImageService } from './apartment-image.service';
import { ApartmentImageController } from './apartment-image.controller';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

@Module({
  controllers: [ApartmentImageController],
  providers: [ApartmentImageService, PrismaService],
  exports: [ApartmentImageService],
})
export class ApartmentImageModule {}
