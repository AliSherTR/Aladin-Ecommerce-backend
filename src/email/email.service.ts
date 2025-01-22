import { MailerService } from '@nestjs-modules/mailer';  
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from 'src/interface/event-types.interface';
  
interface Email {  
  to: string;  
  data: any;  
}  
  
export class EmailService {  
  
constructor(private readonly mailerService: MailerService) {}  
  
@OnEvent('user.welcome')  
async welcomeEmail(data: EventPayloads['user.welcome']) {  
  const { email, name } = data;  

  const subject = `Welcome to Company: ${name}`;  

  await this.mailerService.sendMail({  
    to: email,  
    subject,  
    template: './welcome',  
    context: {  
      name,  
    },  
  });  
}  
}
