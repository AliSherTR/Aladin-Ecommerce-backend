import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
<<<<<<< HEAD
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailListeners } from './email.listeners';
console.log('Template Path:', join(__dirname, 'templates'));
=======
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

>>>>>>> be63b694591305f8994ff5b42ceda1a21d87e7ab
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
<<<<<<< HEAD
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


=======
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
>>>>>>> be63b694591305f8994ff5b42ceda1a21d87e7ab
export class EmailModule { }
