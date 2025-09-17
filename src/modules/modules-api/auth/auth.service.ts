import { BadRequestException, Body, Injectable, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { TokenService } from 'src/modules/modules-system/token/token.service';
import { Users } from 'generated/prisma';
import { RegisterDto } from './dto/register.dto';
import { TotpService } from '../totp/totp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly totpService: TotpService,
  ) {}
  getInfo(user: Users) {
    return { ...user, isTotp: !!user.totpSecret };
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password, token } = loginDto;
    const userExits = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!userExits) {
      throw new BadRequestException(
        'Người dùng chưa tồn tại, vui lòng đăng ký',
      );
    }
    // Vào case này khi người dùng đang bật 2fa
    if (userExits.totpSecret) {
      if (!token) {
        // Bước 1 không có token
        // Nếu không có token thì trả về isTotp là true để Frontend chuyển sang layout nhập token
        return { isTotp: true };
      } else {
        this.totpService.verify({ token: token }, userExits);
        // Bước 2 Phải gửi token
      }
    }
    if (!userExits.password) {
      throw new BadRequestException(
        'Vui lòng đăng nhập bằng mạng xã hội (gmail, facebook)',
      );
    }

    const isPassword = bcrypt.compareSync(password, userExits.password);
    if (!isPassword) {
      throw new BadRequestException('Mật khẩu không chính xác');
    }
    const tokens = this.tokenService.createTokens(userExits.id);
    return tokens;
  }
  async register(registerDto: RegisterDto) {
    const { email, password, fullName } = registerDto;

    const userExits = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExits) {
      throw new BadRequestException('Ông có tài khoản đăng ký chi nữa');
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const { password: _, ...userNew } = await this.prisma.users.create({
      data: {
        email: email,
        password: passwordHash,
        fullName: fullName,
      },
    });

    console.log({ userNew });

    // delete userNew.password;

    return userNew;
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
