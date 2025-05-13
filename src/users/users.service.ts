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
  ) {}

  // ✅ Signup
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

    const payload = { sub: savedUser._id, email: savedUser.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User created successfully',
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        countryClub: savedUser.countryClub,
        league: savedUser.league,
        contact: savedUser.contact
      },
    };
  }

  // ✅ Login
  async login(email: string, password: string): Promise<any> {
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
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}