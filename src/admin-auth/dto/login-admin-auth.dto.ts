import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginAdminDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}