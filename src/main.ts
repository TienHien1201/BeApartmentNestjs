import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';
import { ProtectGuard1 } from './common/gruad/protect/protect1.guard';
import { PermissionGuard1 } from './common/gruad/permission/permission1.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Global
  const reflector = app.get(Reflector);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));
  app.useGlobalGuards(new ProtectGuard1(reflector));
  app.useGlobalGuards(new PermissionGuard1(reflector));

  const config = new DocumentBuilder()
    .setTitle('Aparment Bussiness')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    swaggerOptions: { persistAuthorization: true }, //Giup luu lai token sau moi lan f5
  });
  const logger = new Logger('bootstrap');
  await app.listen(PORT ?? 3069, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();