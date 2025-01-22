import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [AuthModule,  UsersModule, PrismaModule , ConfigModule.forRoot(), EmailModule ,  EventEmitterModule.forRoot() ],
  controllers: [],
  providers: [],
})
export class AppModule {}
