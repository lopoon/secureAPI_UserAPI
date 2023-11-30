import { Controller, Get,  Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, ScopesGuard, Scopes } from '@lopoon/shared-auth-module'; // import JwtAuthGuard and ScopesGuardfor authorization
import { UserService } from './user.service';
import { ApiResponse } from '../interfaces/api-response.interface';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @UseGuards(JwtAuthGuard, ScopesGuard)
  @Scopes('user:read')
  @Get()
  async findOne(@Req() request: any): Promise<ApiResponse>  {
    const id = request.jwtToken.id;
    try {
      const response = await this.UserService.findOne(id);
      return {
        status: 'success',
        data: response,
        message: 'Profile retrieved',
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
