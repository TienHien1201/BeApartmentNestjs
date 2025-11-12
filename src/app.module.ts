import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/modules-api/article/article.modules';
import { PrismaModule } from './modules/modules-system/prisma/prisma.modules';
import { AuthModule } from './modules/modules-api/auth/auth.module';
import { TokenModule } from './modules/modules-system/token/token.module';
import { ProtectStrategy2 } from './common/gruad/protect/protect2.stratery';
import { PermissionStrategy2 } from './common/gruad/permission/permission2.stratery';
import { TotpModule } from './modules/modules-api/totp/totp.module';
import { ApartmentModule } from './modules/modules-api/apartment/apartment.module';
import { UserModule } from './modules/modules-api/user/user.module';
import { ApartmentImageModule } from './modules/modules-api/apartment-image/apartment-image.module';

@Module({
  imports: [
    ArticleModule,
    PrismaModule,
    AuthModule,
    TokenModule,
    TotpModule,
    UserModule,
    ApartmentModule,
    ApartmentImageModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy2, PermissionStrategy2],
})
export class AppModule {}
