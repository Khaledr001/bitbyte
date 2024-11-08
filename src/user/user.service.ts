import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

interface IfindOption {
  id?: number;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.databaseService.user.create({
        data: {
          ...createUserDto,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.databaseService.user.findMany();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve users');
    }
  }

  async findOne(find: IfindOption): Promise<User> {
    try {
      let user;
      if (find.email) {
        user = await this.databaseService.user.findUnique({
          where: { email: find.email },
        });
      } else {
        user = await this.databaseService.user.findUnique({
          where: { id: Number(find.id) },
        });
      }
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      return await this.databaseService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const existingUser = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      return await this.databaseService.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete user');
    }
  }
}
