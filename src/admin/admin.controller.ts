import { Controller, Get, UseGuards, Req, Res, Body } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AdminService } from './admin.service';
import { CustomJwtAuthGuard } from 'src/guards/jwt.guard';


@Controller('admin')
@UseGuards(CustomJwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('dashboard')
  @Roles('ADMIN')
  async getAdminData(@Body() body: any, @Req() req: any, @Res() res: any) {
    console.log("body", body);

    const admin = await this.adminService.getAdminData(req.user);
    console.log("admin", admin);

    return res.status(200).json({
      success: "Success",
      message: "Admin data is successfully retrieved",
      data: admin,
    })
  }


}
