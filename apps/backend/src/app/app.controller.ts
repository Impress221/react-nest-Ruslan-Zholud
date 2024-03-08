import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../models';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: String })
  async createUser(
    @Body(
      new ValidationPipe({ transform: true })
    ) createUserDto: CreateUserDto
    ): Promise<String> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/getUser/:id')
  @ApiResponse({ status: 201, type: UserModel })
  async getUser(
    @Param('id') id: string
  ): Promise<Partial<UserModel>> {
    return this.userService.getUser(id);
  }
}
