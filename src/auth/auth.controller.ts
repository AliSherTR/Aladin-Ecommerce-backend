import { Body, Controller, Get, Post, Req, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from './dto/register.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypedEventEmitter } from 'src/event-emitter/typed-event-emitter.class';
import { CustomJwtAuthGuard } from 'src/guards/jwt.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly eventEmitter: TypedEventEmitter) { }

    @Post("login")
    @UseGuards(AuthGuard("local"))
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @ApiOperation({ summary: 'Login with email and password' })
    async login(@Body() body: LoginDto, @Request() req: any, @Res() res: any) {
        const user = await this.authService.login(req.user);
        if (!user.email) {
            this.eventEmitter.emit("user.welcome", {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                activationLink: `http://localhost:3000/email?token=${encodeURIComponent(user.access_token)}`,

            })
            return res.status(401).json({
                status: "success",
                message: `We have sent you an email at ${user.email} to activate your account`,
            })
        }
        return res.status(200).json({
            status: "success",
            data: {
                "email": user.email,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "access_token": user.access_token
            },
        })
    }

    @Post("register")
    @ApiOperation({ summary: 'Register with email, password and username' })
    // @UsePipes(new ValidationPipe())
    async register(@Body() body: SignUpDto, @Res() res: any) {
        try {
            const user = await this.authService.register(body.email, body.password, body.firstName, body.lastName, body.confirmPassword);
            this.eventEmitter.emit('user.welcome', {
                name: `${body.firstName} ${body.lastName}`,
                email: body.email,
                activationLink: `http://localhost:3000/email?token=${encodeURIComponent(user.access_token)}`
            });
            return res.status(401).json({
                status: "success",
                message: `We have sent you an email at ${user.email} to activate your account`
            })
        } catch (error) {
            console.error("❌ Registration Error:", error);
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    @Post("verify-email")
    @UseGuards(AuthGuard("jwt"))
    async verifyEmail(@Req() req: any) {
        return await this.authService.verifyEmail(req.user);
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
