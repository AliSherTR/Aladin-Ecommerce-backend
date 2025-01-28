import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailListeners } from './email.listeners';
console.log('Template Path:', join(__dirname, 'templates'));
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "deadlool45@gmail.com",
          pass: "bkhklilismcwioas",
        }
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),

        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      }
    })
  ],
  controllers: [EmailController],
  providers: [EmailService, MailListeners],
})


export class EmailModule { }
