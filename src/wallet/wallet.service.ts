import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wallet } from './schema/wallet-schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async createUserWallet(createWalletDto: CreateWalletDto, _id: string): Promise<Wallet> {
    const { name, price, position, assist, dribble, goals, club } = createWalletDto;

    const user = await this.userModel.findById(_id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.wallet < price) {
      throw new BadRequestException('Insufficient balance to buy this player');
    }

    user.wallet -= price;
    await user.save();

    const playerData = new this.walletModel({
      name,
      price,
      position,
      assist,
      dribble,
      goals,
      club,
      user: user._id
    });

    return await playerData.save();
  }
  async findAllByUserId(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const userItems = await this.walletModel.find({ user: userObjectId }).lean();
    console.log('user item', userItems);
    return userItems;
  }
}