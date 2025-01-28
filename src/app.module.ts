import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { FileUploadModule } from './shared/file-upload/file-upload.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ConfigModule.forRoot(), FileUploadModule, EmailModule, EventEmitterModule.forRoot()],
=======
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypedEventEmitterModule } from './event-emitter/event-emitter.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot(),
    EmailModule,
    EventEmitterModule.forRoot(),
    TypedEventEmitterModule,
  ],
>>>>>>> be63b694591305f8994ff5b42ceda1a21d87e7ab
  controllers: [],
  providers: [],
})
export class AppModule { }
