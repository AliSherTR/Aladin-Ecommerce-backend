import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
    @ApiProperty({example: "John Doe" , description: "User's name"})
    @IsString()
    username: string

    @ApiProperty({example: "johndoe@gmail.com" , description: "User's Email"})
    @IsEmail()
    email: string

    @ApiProperty({example: "a strong password" , description: "User's password"})
    @IsStrongPassword()
    password: string

}