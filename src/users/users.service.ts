import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  async getUserDetails(data: any) {

    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
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


  async updateUserInformation(user: any, data: any) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { uuid: user.userId },
        data :{
          ...data,
          updatedAt: new Date()
        }
      });

      return await this.getUserDetails(updatedUser);
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException("Invalid data")
      }

      return {
        status: "fail",
        message: "Something went wrong try again later"
      }
    }



  }

} 
