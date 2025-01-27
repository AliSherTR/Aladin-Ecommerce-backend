import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access_token, // Extract token from cookie
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Use an env variable in production
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role , isEmailVerified: payload.isEmailVerified }; // Attach user info to request
  }
}
