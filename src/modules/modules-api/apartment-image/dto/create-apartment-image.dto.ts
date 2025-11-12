import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateApartmentImageDto {
  @IsNotEmpty()
  @IsNumber()
  apartment_id: number;
  @IsNotEmpty()
  @IsString()
  image_url: string;
}
