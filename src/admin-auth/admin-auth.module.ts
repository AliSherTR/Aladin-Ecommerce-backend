import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, PrismaService],
})
export class AdminAuthModule { }
