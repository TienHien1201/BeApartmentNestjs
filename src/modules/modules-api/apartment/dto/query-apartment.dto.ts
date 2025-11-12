import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryApartmentDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Trang hiện tại (>=1)',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Số phần tử trên mỗi trang (>=1)',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize: number;

  @ApiPropertyOptional({
    example: '{"apartment_name": "Căn hộ"}',
    description: 'Bộ lọc tìm kiếm (JSON string)',
  })
  @IsOptional()
  @IsJSON()
  filters?: string;
}
