import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
    @ApiProperty({example: "John" , description: "User's first name"})
    @IsString()
    firstName: string

    @ApiProperty({example: "JDoe" , description: "User's last name"})
    @IsString()
    lastName: string

    @ApiProperty({example: "johndoe@gmail.com" , description: "User's Email"})
    @IsEmail()
    email: string

    @ApiProperty({example: "a strong password" , description: "User's password"})
    @IsStrongPassword()
    password: string

    @ApiProperty({example: "Same as Password"})
    @IsNotEmpty()
    confirmPassword: string;

}