import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import path from 'path';
import * as fs from 'fs';
import { cloudinary } from 'src/common/cloudinary/init.cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { Users } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async avatarLocal(file: Express.Multer.File, user: Users) {
    console.log(file);
    if (!file) {
      throw new BadRequestException('Chưa tìm thấy file');
    }

    if (!user) {
      throw new BadRequestException('Chưa tìm thấy user');
    }

    // Đảm bảo 1 user chỉ có 1 avatar

    try {
      await this.prisma.users.update({
        where: {
          id: Number(user.id),
        },
        data: {
          avatar: file.filename,
        },
      });

      if (user.avatar) {
        // tạo ra đường dẫn đến file, tương thích với mọi hệ điều hành
        // win: \\
        // mac: //
        const oldFilePath = path.join('images', user.avatar);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
        cloudinary.uploader.destroy(user.avatar);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }

    return {
      folder: 'images/',
      filename: file.fieldname,
      imgUrl: `images/${file.fieldname}`,
    };
  }

  async avatarCloud(file: Express.Multer.File, user: Users) {
    if (!file) {
      throw new BadRequestException('Chưa tìm thấy file');
    }

    if (!user) {
      throw new BadRequestException('Chưa tìm thấy user');
    }

    const uploadResult = await new Promise<UploadApiResponse | undefined>(
      (resolve) => {
        cloudinary.uploader
          .upload_stream({ folder: 'images' }, (error, uploadResult) => {
            return resolve(uploadResult);
          })
          .end(file.buffer);
      },
    );
    console.log('uploadResult', uploadResult);
    if (uploadResult === undefined) {
      throw new BadRequestException('Chưa tìm thấy file');
    }

    console.log({ uploadResult });

    try {
      await this.prisma.users.update({
        where: {
          id: Number(user.id),
        },
        data: {
          avatar: uploadResult.public_id,
        },
      });

      if (user.avatar) {
        // tạo ra đường dẫn đến file, tương thích với mọi hệ điều hành
        // win: \\
        // mac: //
        const oldFilePath = path.join('images', user.avatar);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
        cloudinary.uploader.destroy(user.avatar);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }

    return {
      folder: uploadResult.folder,
      filename: file.originalname,
      imgUrl: uploadResult.secure_url,
    };
  }
}
