import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use true if using port 465
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // Not your Gmail password, but an app-specific password
        },
      },
      defaults: {
        from: process.env.FROM_EMAIL,
      },
      template: {
        dir: join(process.cwd(), 'src', 'email', 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule { }