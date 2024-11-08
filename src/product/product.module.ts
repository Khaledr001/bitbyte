import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  providers: [ProductService, AuthService, JwtService, UserService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
