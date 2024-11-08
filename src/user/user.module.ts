import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, AuthService, JwtService],
  controllers: [UserController]
})
export class UserModule {}
