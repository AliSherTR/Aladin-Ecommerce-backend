import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({example: "user@example.com"})
    @IsEmail()
    email : string;

    @ApiProperty({example: "Secure Password" , description: "User's password"})
    @IsNotEmpty()
    password: string;
}