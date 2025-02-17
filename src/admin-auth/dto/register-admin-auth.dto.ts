import { IsEmail, IsNotEmpty, MinLength, IsString } from "class-validator";


export class RegisterAdminDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(10)
    password: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

}
