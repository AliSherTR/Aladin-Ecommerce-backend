import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService : PrismaService , private readonly jwtService : JwtService){}

    async validateUser(email: string, password: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            return { id: user.id, email: user.email, role: user.role };
        }
    
        throw new UnauthorizedException('Invalid Email or Password');
    }
    

    async login(user:any ) {
        const payload = {sub: user.id , email: user.email , role: user.role}

        return {
            "id": user.id,
            "email" : user.email,
            "access-token": this.jwtService.sign(payload)
        }
    }

    async register(email: string , password: string , name: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) {
            throw new ConflictException("An account already exists.");
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const payload = {sub: user.id , email: user.email , role: user.role}

        return {
            "id": user.id,
            "email" : user.email,
            "access-token": this.jwtService.sign(payload)
        }
    }
}
