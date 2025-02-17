import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { RegisterAdminDto } from './dto/register-admin-auth.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) { }

  @Post('register')
  async register(@Body() regiserAdminDto: RegisterAdminDto) {
    return this.adminAuthService.register(regiserAdminDto);
  }




}
