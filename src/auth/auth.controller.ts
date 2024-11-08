import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Create a DTO for login
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtResponseDto } from './dto/jwt-response.dto'; // Create a DTO for JWT response
import { ResponseService } from 'src/shared/response.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    type: JwtResponseDto,
  })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() login: LoginDto) {
    try {
      const access_token = await this.authService.login(req.user);
      return this.responseService.success(
        { access_token },
        'Login successfull!',
      );
    } catch (error) {
      return this.responseService.error(
        error.message || 'Failed to login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
