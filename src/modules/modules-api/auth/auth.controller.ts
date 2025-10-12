import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { User } from 'src/common/decorator/user.decorator';
import type { Users } from 'generated/prisma';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessageResonse } from 'src/common/decorator/message-response.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @Public()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  @Public()
  @MessageResonse('Login Success')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Get('get-info')
  @MessageResonse('Lấy thông tin người dùng thành công')
  getInfo(@User() user: Users) {
    return this.authService.getInfo(user);
  }
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
