import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('validating user');
    const user = await this.userService.findOne({ email });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, role: user.role, id: user.id };
    const access_token = this.jwtService.sign(payload)
    return access_token;
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User Not Found!');
    }
    const currentUser = { id: user.id, role: user.role, email: user.email };
    return currentUser;
  }
}
