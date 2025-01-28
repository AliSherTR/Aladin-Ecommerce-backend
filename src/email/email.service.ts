import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }


  async sendWelcomEmail(email: string, firstName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Aladin!',
      template: './welcom',
      context: { firstName },
    })
  }


  async sendConfirmationEmail(to: string, token: string) {
    const confirmationUrl = `http://localhost:3000/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to,
      subject: 'Confirm your Aladin account',
      template: './confirmation',
      context: { confirmationUrl },
    })
  }
}
