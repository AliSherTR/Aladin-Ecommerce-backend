import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private readonly prismaService: PrismaService) { }
    async getAdminData(data: any) {


        const admin = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            },
            select: {
                uuid: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            }
        })
        console.log("ADMINNN", admin);

        if (!admin) {
            throw new UnauthorizedException('Admin not found');

        }

        return admin;
    }

}
