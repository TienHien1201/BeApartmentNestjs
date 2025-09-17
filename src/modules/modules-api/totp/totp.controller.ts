import { Body, Controller, Post } from '@nestjs/common';
import { TotpService } from './totp.service';
import { SaveTotpDto } from './dto/save-totp.dto';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';
import { MessageResonse } from 'src/common/decorator/message-response.decorator';
import { User } from 'src/common/decorator/user.decorator';
import type { Users } from 'generated/prisma';
import { DisableTotpDto } from './dto/disable-totp.dto';
import { VerifyTotpDto } from './dto/verify-totp.dto';

@Controller('totp')
export class TotpController {
  constructor(private readonly totpService: TotpService) {}

  @Post('generate')
  @SkipPermission()
  @MessageResonse('generate success')
  generate(@User() user: Users) {
    return this.totpService.generate(user);
  }

  @Post('save')
  @SkipPermission()
  @MessageResonse('save success')
  save(@Body() saveTotpDto: SaveTotpDto, @User() user: Users) {
    return this.totpService.save(saveTotpDto, user);
  }

  @Post('disable')
  @SkipPermission()
  @MessageResonse('disable success')
  disable(@Body() disableTotpDto: DisableTotpDto, @User() user: Users) {
    return this.totpService.disable(disableTotpDto, user);
  }

  @Post('verify')
  @SkipPermission()
  @MessageResonse('verify success')
  verify(@Body() verifyTotpDto: VerifyTotpDto, @User() user: Users) {
    return this.totpService.verify(verifyTotpDto, user);
  }
}
