import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword
    });

    const savedUser = await createdUser.save();
    console.log(savedUser, 'user');

    const payload = { sub: savedUser._id, email: savedUser.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User created successfully',
      token,
      savedUser
    };
  }

  async login(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      user
    };
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(_id, updateUserDto, { new: true }).exec();
  }

  async fundWallet(_id: string, amount: number): Promise<User> {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const parsedAmount = Number(amount);
    console.log(parsedAmount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new BadRequestException('Amount must be a valid positive number');
    }

    user.wallet += parsedAmount;
    console.log(user.wallet);

    return await user.save();
  }

  async remove(_id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(_id).exec();
  }
}