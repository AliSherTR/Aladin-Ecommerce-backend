<<<<<<< HEAD
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
=======
import { MailerService } from '@nestjs-modules/mailer';  
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from 'src/interface/event-types.interface';
  
interface Email {  
  to: string;  
  data: any;  
}  
@Injectable()
export class EmailService {  
  
constructor(private readonly mailerService: MailerService) {}  
  
@OnEvent('user.welcome')  
async welcomeEmail(data: EventPayloads['user.welcome']) {  
  const { email, name , activationLink } = data;  
  const subject = `Welcome to Aladin: ${name}`;  

  await this.mailerService.sendMail({  
    to: email,  
    subject,  
    template: './welcome',  
    context: {  
      name,  
      activationLink
    },  
  });  
}  
>>>>>>> be63b694591305f8994ff5b42ceda1a21d87e7ab
}
