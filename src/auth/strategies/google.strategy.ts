import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

export class GoogleStrategy extends PassportStrategy(Strategy , "google"){
    constructor(){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACKURL,
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any)=> void): Promise<any> {
        const { id, emails , photos } = profile;
        const user = {
          provider: 'GOOGLE',
          providerId: id,
          email: emails?.[0]?.value || null,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          image: photos?.[0]?.value || null,
        };
        done(null, user); 
      }
}