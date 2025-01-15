import { Body, Controller, Get, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from './dto/register.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    @UseGuards(AuthGuard("local"))
    @UsePipes(new ValidationPipe)
    @ApiOperation({ summary: 'Login with email and password' })
    async login(@Body() body : LoginDto , @Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post("register")
    @ApiOperation({ summary: 'Register with email, password and username' })
    async register(@Body() body:SignUpDto){
        return this.authService.register(body.email , body.password , body.username , body.confirmPassword);
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    @ApiOperation({summary: "Login with google"})
    async googleLogin(){}

    @Get('callback/google')
    @UseGuards(AuthGuard('google'))
    @ApiExcludeEndpoint()
    async githubCallback(@Req() req: any) {
        return this.authService.loginWithGoogle(req.user);
    }
}
