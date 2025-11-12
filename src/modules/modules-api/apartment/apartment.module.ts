import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { ApartmentImageModule } from '../apartment-image/apartment-image.module';

@Module({
  imports: [ApartmentImageModule],
  controllers: [ApartmentController],
  providers: [ApartmentService, PrismaService],
})
export class ApartmentModule {}
