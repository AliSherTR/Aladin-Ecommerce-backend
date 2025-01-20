import { Body, Controller, Get, Patch, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CustomJwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags("User")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("me")
    @UseGuards(CustomJwtAuthGuard)
    @ApiOperation({ summary: 'Get Account Details' })
    async getUserData(@Req() req: any , @Res() res: any) {
        const user = await this.usersService.getUserDetails(req.user);
        return res.status(200).json({
            status: 'success',
            message: 'User details retrieved successfully',
            data: user,
          });
    }

    @Patch("me")
    @ApiOperation({ summary: 'Update User Information' })
    @UseGuards(CustomJwtAuthGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    async updateUser(@Req() req: any , @Body() body: UpdateUserDto){
        return await this.usersService.updateUserInformation(req.user , body);
    }
}
