import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.usersService.login(email, password);
  }

  @Put(':id')
  async update(@Param('id') _id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.usersService.update(_id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @Put(':id/wallet')
  async updateWallet(
    @Param('id') _id: string,
    @Body('amount') amount: number
  ) {
    const numericAmount = Number(amount);
    return this.usersService.fundWallet(_id, numericAmount);
  }

  @Delete(':id')
  async remove(@Param('id') _id: string): Promise<{ message: string }> {
    const deletedUser = await this.usersService.remove(_id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }
}