import { Body, Controller, Get, Post, Req, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from './dto/register.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypedEventEmitter } from 'src/event-emitter/typed-event-emitter.class';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService , private readonly eventEmitter: TypedEventEmitter) { }

    @Post("login")
    @UseGuards(AuthGuard("local"))
    @UsePipes(new ValidationPipe({whitelist: true}))
    @ApiOperation({ summary: 'Login with email and password' })
    async login(@Body() body: LoginDto, @Request() req: any) {
        return await this.authService.login(req.user);
    }

    @Post("register")
    @ApiOperation({ summary: 'Register with email, password and username' })
    @UsePipes(new ValidationPipe())
    async register(@Body() body: SignUpDto) {
        const user = await this.authService.register(body.email, body.password, body.firstName , body.lastName, body.confirmPassword);
        this.eventEmitter.emit('user.welcome', {  
            name: `${body.firstName} ${body.lastName}`,  
            email: body.email,  
          });  
        return user;
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    @ApiOperation({ summary: "Login with google" })
    async googleLogin() { }

    @Get('callback/google')
    @UseGuards(AuthGuard('google'))
    @ApiExcludeEndpoint()
    async googleCallBack(@Req() req: any, @Res() res: any) {
        const user = req.user;

        const loginResponse = await this.authService.loginWithGoogle(user);

        res.cookie('access_token', loginResponse.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        // Redirect to the frontend
        res.redirect(`http://localhost:3000/`);
    }
}
