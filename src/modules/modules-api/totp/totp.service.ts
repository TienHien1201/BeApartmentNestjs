import { BadRequestException, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { SaveTotpDto } from './dto/save-totp.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { DisableTotpDto } from './dto/disable-totp.dto';
import { VerifyTotpDto } from './dto/verify-totp.dto';
import { users } from 'generated/prisma';

/**
ALTER TABLE `Users`
ADD totpSecret VARCHAR(255);
 */

@Injectable()
export class TotpService {
  constructor(private readonly prisma: PrismaService) {}

  // Bước 1 không save secrect
  async generate(user: users) {
    // Nếu mà người dùng đã bật Totp rồi thì không cần phải tạo nữa
    if (user.totp_secret) {
      throw new BadRequestException('User already has totpSecret');
    }

    // tạo secrect
    const secret = authenticator.generateSecret();

    const url = authenticator.keyuri(user.email, 'Cyber Community', secret);

    // tạo qr từ secret
    const qrCode = await toDataURL(url);

    return { secret, qrCode };
  }

  // Bước 2 save secrect
  async save(saveTotpDto: SaveTotpDto, user: users) {
    // nếu người dùng đã bật Totp thì không save nữa
    if (user.totp_secret) {
      throw new BadRequestException('User already has totpSecret');
    }

    const { secret, token } = saveTotpDto;

    const isCheck = authenticator.check(token, secret);
    if (!isCheck) {
      throw new BadRequestException('Token is not valid');
    }

    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        totp_secret: secret,
      },
    });

    return true;
  }

  // Tắt Totp: chỉ áp dụng cho người đã bật
  async disable(disableTotpDto: DisableTotpDto, user: users) {
    if (!user.totp_secret) {
      throw new BadRequestException('User does not have totpSecret');
    }

    const { token } = disableTotpDto;

    const isCheck = authenticator.check(token, user.totp_secret);
    if (!isCheck) {
      throw new BadRequestException('Token is not valid');
    }

    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        totp_secret: null,
      },
    });

    return true;
  }

  // Xác minh token: chỉ áp dụng cho người đã bật
  verify(verifyTotpDto: VerifyTotpDto, user: users) {
    if (!user.totp_secret) {
      throw new BadRequestException('User does not have totpSecret');
    }

    const { token } = verifyTotpDto;

    const isCheck = authenticator.check(token, user.totp_secret);
    if (!isCheck) {
      throw new BadRequestException('Token is not valid');
    }

    return true;
  }
}
