import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAdminDto } from './dto/register-admin-auth.dto';
import { role } from '@prisma/client';

@Injectable()
export class AdminAuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) { }


  async register(registerAdminDto: RegisterAdminDto): Promise<{ access_token: string }> {
    const { firstName, lastName, email, password, confirmPassword } = registerAdminDto;

    const existingAdmin = await this.prismaService.user.findUnique({ where: { email } });

    if (existingAdmin) {
      throw new ConflictException("The admin account already exists");
    }

    if (password !== confirmPassword) {
      throw new ConflictException("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prismaService.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role.ADMIN
      },
    });

    const payload = { sub: admin?.uuid, role: admin?.role, email: admin?.email };

    return {
      access_token: this.jwtService.sign(payload)
    }

  }


  findAll() {
    return `This action returns all adminAuth`;
  }


}
