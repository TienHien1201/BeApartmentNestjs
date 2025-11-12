import { PartialType } from '@nestjs/swagger';
import { CreateApartmentImageDto } from './create-apartment-image.dto';

export class UpdateApartmentImageDto extends PartialType(
  CreateApartmentImageDto,
) {}
