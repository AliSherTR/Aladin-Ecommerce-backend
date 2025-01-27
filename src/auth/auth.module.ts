import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypedEventEmitterModule } from 'src/event-emitter/event-emitter.module';

@Module({
  imports: [PrismaModule , JwtModule.register({
    secret: "secret",
    signOptions: { 
      expiresIn: "1h"
    }
  }) , TypedEventEmitterModule ],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , GoogleStrategy , JwtStrategy]
})
export class AuthModule {}
