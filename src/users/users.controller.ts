import { Body, Controller, Get, Patch, Req, Res, UseGuards, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileUploadInterceptor } from 'src/shared/file-upload/file-upload.interceptor';
import { CustomJwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags("User")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get("me")
    @UseGuards(CustomJwtAuthGuard)
    @ApiOperation({ summary: 'Get Account Details' })
    async getUserData(@Req() req: any, @Res() res: any) {
        const user = await this.usersService.getUserDetails(req.user);
        return res.status(200).json({
            status: 'success',
            message: 'User details retrieved successfully',
            data: user,
        });
    }

    @Patch("me")
    @UseInterceptors(FileUploadInterceptor)
    @ApiOperation({ summary: 'Update User Information' })
    @UseGuards(CustomJwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateUser(@Req() req: any, @Body() body: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
            body.image = `${baseUrl}/uploads/${file.filename}`;

        }

        return await this.usersService.updateUserInformation(req.user, body);
    }


    @Delete(":id")
    @UseGuards(CustomJwtAuthGuard)
    @ApiOperation({ summary: 'Delete User Account' })
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUserInformation(id)

    }
}

