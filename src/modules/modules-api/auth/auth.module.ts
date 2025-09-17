import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from 'src/modules/modules-system/token/token.module';
import { TotpService } from '../totp/totp.service';

@Module({
  imports: [TokenModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, TotpService],
})
export class AuthModule {}
