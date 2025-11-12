import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { apartments_business_type } from 'generated/prisma';

export class CreateApartmentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Origami' })
  apartment_name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '1' })
  zone_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2PN 2WC...' })
  apartment_type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Căn góc, view sông...' })
  apartment_note: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Full nội thất' })
  apartment_condition: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'rent or sale' })
  business_type: apartments_business_type;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '70m² (tim) 80m² (tt)' })
  area_description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'Giá phải là số hợp lệ' })
  @Min(1, { message: 'Giá phải lớn hơn 0' })
  @ApiProperty({ example: '18000000' })
  rental_price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'Giá phải là số hợp lệ' })
  @Min(1, { message: 'Giá phải lớn hơn 0' })
  @ApiProperty({ example: '18000000000' })
  sale_price: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Đông Nam' })
  direction: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: 'true' })
  is_hot_deal: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: '5' })
  discount_rate: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
   @ApiProperty({
    example: [
      'https://res.cloudinary.com/demo/image/upload/a3_0908_1.jpg',
      'https://res.cloudinary.com/demo/image/upload/a3_0908_2.jpg',
      'https://res.cloudinary.com/demo/image/upload/a3_0908_3.jpg',
      'https://res.cloudinary.com/demo/image/upload/a3_0908_4.jpg',
    ],
    description: 'Danh sách URL hình ảnh của căn hộ',
  })
  image_urls: string[];

}
