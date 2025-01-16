import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) { }

    async getUserDetails(req: any) {
        const user = await this.prismaService.user.findUnique({
          where: {
            email: req.user.email,
          },
          select: {
            email: true,
            firstName: true,
            lastName: true,
            provider: true,
            providerId: true,
            role: true,
            dateOfBirth: true,
            phoneNumber: true,
            balance: true,
            gender: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      
        if (!user) {
          throw new UnauthorizedException('Your session has expired. Please Login again');
        }
      
        return user; // Returns user details without `password` and `id`
      }
      
} 
