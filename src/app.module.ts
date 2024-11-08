import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_CONFIG } from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [APP_CONFIG],
      cache: true,
      expandVariables: true,
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
    SharedModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
