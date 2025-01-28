import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from './email.service';


@Injectable()
export class MailListeners {
    constructor(private readonly emailService: EmailService) { }

    @OnEvent('user.loggedIn')
    async handleUserLoggedIn(payload: { email: string; firstName: string; lastName: string }) {
        console.log(`User logged in: ${payload.email}`);
        // Optionally, send a notification email to the user
        await this.emailService.sendWelcomEmail(payload.email, payload.firstName);
    }


    @OnEvent('user.registered')
    async handleUserRegisteredEvent(payload: {
        uuid: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }) {
        console.log(`User registered: ${payload.email}`);

        try {
            await this.emailService.sendWelcomEmail(payload.email, payload.firstName)
            console.log(`Welcome email sent to: ${payload.email}`);
        } catch (error) {
            console.error(`Failed to send welcome email to ${payload.email}:`, error.message);
        }
    }
}