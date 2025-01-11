import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PrismaModule , JwtModule.register({
    secret: "secret",
    signOptions: { 
      expiresIn: "1h"
    }
  })],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , GoogleStrategy]
})
export class AuthModule {}
