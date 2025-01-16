import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CustomJwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("me")
    @UseGuards(CustomJwtAuthGuard)
    @ApiOperation({ summary: 'Get Account Details' })
    async getUserData(@Req() req: any , @Res() res: any) {
        const user = await this.usersService.getUserDetails(req);
        return res.status(200).json({
            status: 'success',
            message: 'User details retrieved successfully',
            data: user,
          });

    }
}
