import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { Request } from 'express';
import { users } from 'generated/prisma';
// import { jwtConstants } from './constants';

type RequestUser = Request & { user: users };

@Injectable()
export class PermissionStrategy2 extends PassportStrategy(
  Strategy,
  'permission',
) {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async validate(req: RequestUser) {
    console.log(`GUARD ----- PERMISSION - validate`);
    // đảm bảo có user
    const user = req?.user;
    if (!user) {
      console.log(`User not found in protect`);
      throw new BadRequestException('User Not Found');
    }

    // console.log({user});

    // role admin thì cho qua
    if (user.role_id === 1) {
      return user;
    }

    // method
    const method = req.method;
    // endpoint
    // /api/auth + /get-info
    const endpoint = req.baseUrl + req.route?.path;

    // tham khảo
    // const permission = await prisma.permissions.findFirst({
    //     where: {
    //         endpoint: endpoint,
    //         method: method,
    //     },
    // });

    const rolePermissionExist = await this.prisma.role_permission.findFirst({
      where: {
        role_id: user.role_id,
        // permissionId: permission.id, // // tham khảo
        permissions: {
          endpoint: endpoint,
          method: method,
        },
        is_active: true,
      },
    });

    console.log({ user, method, endpoint, rolePermissionExist });
    if (!rolePermissionExist) {
      throw new BadRequestException('User not permission');
    }

    return user;
  }
}
