import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfigaration: ConfigType<typeof jwtConfig>,
    private authService: AuthService,
  ) {
    console.log("jwt strategy")
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfigaration.secret,
    });
  }

  validate(payload: any) {
    console.log("validate jwt");
    const id = payload.id;
    console.log(id);
    return this.authService.validateJwtUser(id);
  }
}
