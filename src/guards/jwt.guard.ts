import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new UnauthorizedException('Your session has expired. Please log in again.');
    }
    if (user.role !== 'ADMIN' && !user.isEmailVerified) {
      throw new UnauthorizedException('Your email is not verified.');
    }
    return user;
  }
}