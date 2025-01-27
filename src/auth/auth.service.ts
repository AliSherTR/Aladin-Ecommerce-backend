import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.uuid, email: user.email, role: user.role };
    }

    throw new UnauthorizedException('Invalid Email or Password');
  }

  async login(user: any) {
    const existingUser = await this.prismaService.user.findUnique({
        where: {
            email: user.email
        }
    })

    if(!existingUser) {
        throw new UnauthorizedException("Invalid Email or Password");
    }
    if (!existingUser.isEmailVerified) {
      const payload = {
        sub: existingUser.uuid,
        email: existingUser.email,
        role: existingUser.role,
        IsEmailVerified: existingUser.isEmailVerified,
      };

      return {
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        isEmailVerified: existingUser.isEmailVerified,
        access_token: this.jwtService.sign(payload),
      };
    }
    const payload = { sub: existingUser.uuid, email: existingUser.email, role: existingUser.role };

    return {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      isEmailVerified: existingUser.isEmailVerified,
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginWithGoogle(user: any) {
    const { provider, providerId, email, firstName, lastName, image } = user;

    let existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            provider: provider,
            providerId: providerId,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (existingUser) {
      let payload = {
        sub: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      };
      return {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        access_token: this.jwtService.sign(payload),
      };
    }

    existingUser = await this.prismaService.user.create({
      data: {
        firstName,
        lastName,
        email,
        provider: 'GOOGLE',
        providerId,
        image,
        isEmailVerified: true,
      },
    });

    let payload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    return {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    confirmPassword: string,
  ) {
    if (password !== confirmPassword) {
      throw new ConflictException('Passwords Do Not Match');
    }
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('An account already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const payload = {
      sub: user.uuid,
      email: user.email,
      role: user.role,
      IsEmailVerified: user.isEmailVerified,
    };

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyEmail(user: any) {
    const existingUser = await this.prismaService.user.update({
      where: {
        email: user.email,
      },
      data: {
        isEmailVerified: true,
      },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid Token');
    }

    const payload = {
      sub: existingUser.uuid,
      email: existingUser.email,
      role: existingUser.role,
    };

    return {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      access_token: this.jwtService.sign(payload),
    };
  }
}
