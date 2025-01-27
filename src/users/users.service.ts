import { ConflictException, HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService, private readonly JwtService: JwtService) { }

  async getUserDetails(data: any) {

    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        dateOfBirth: true,
        phoneNumber: true,
        balance: true,
        gender: true,
        image: true,
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
        where: { email: user.email },
        data: {
          ...data,
          updatedAt: new Date()
        },
        select: {
          uuid: true,
          email: true,
        }
      });



      const newUpdatedUser = await this.getUserDetails(updatedUser);

      const payload = { sub: updatedUser.uuid, email: newUpdatedUser.email, role: newUpdatedUser.role }

      return {
        status: "success",
        message: "User Updated Successfully",
        data: { ...newUpdatedUser, "access_token": this.JwtService.sign(payload) }
      };
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException("Invalid data")
      }
      if (error.code === "P2025") {
        throw new ConflictException("No User found with the given email")
      }
      throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

} 
