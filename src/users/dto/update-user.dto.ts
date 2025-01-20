import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsPhoneNumber, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'First name of the user' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name of the user' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Date of birth of the user (ISO 8601 format)' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ description: 'Phone number of the user' })
  @IsOptional()
  @IsPhoneNumber(null)
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Gender of the user (e.g., Male, Female, Other)' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ description: 'Profile image URL' })
  @IsOptional()
  @IsUrl()
  image?: string;
}
