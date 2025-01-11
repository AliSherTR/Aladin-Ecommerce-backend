import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    @UseGuards(AuthGuard("local"))
    @UsePipes(new ValidationPipe)
    async login(@Body() body : LoginDto , @Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post("register")
    async register(@Request() req:any){
        return this.authService.register(req.body.email , req.body.password , req.body.username);
    }
}
