import { MailerService } from "@nestjs-modules/mailer";

interface Email {
    to: string;
    date: any;
}


export class EmailService {
    constructor(private readonly mailerService: MailerService) { }

    async welcomeEmail(data) {
        const { email, name } = data;

        const subject = `Welcome to Aladin ${name}`;


        await this.mailerService.sendMail({
            to: email,
            subject,
            template: './welcome',
            context: {
                name,
            },
        })
    }
}