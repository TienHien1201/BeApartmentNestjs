import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional() //Là cái token này require theo kiểu có cũng đc không có cũng không sao
  token: string;
}
