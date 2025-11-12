import { Module } from '@nestjs/common';
import { ApartmentImageService } from './apartment-image.service';
import { ApartmentImageController } from './apartment-image.controller';
import { ApartmentService } from '../apartment/apartment.service';

@Module({
  controllers: [ApartmentImageController],
  providers: [ApartmentImageService, ApartmentService],
})
export class ApartmentImageModule {}
