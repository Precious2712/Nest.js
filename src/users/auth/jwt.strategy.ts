import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { JwtPayload } from './jwt-payload.interface';

interface AuthenticatedUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  countryClub: string;
  league: string;
  team: string;
  wallet: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.userModel.findById(payload.sub).select('-password');
    if (!user) {
      throw new UnauthorizedException('Invalid token: user not found');
    }

    return {
      _id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      countryClub: user.countryClub,
      league: user.league,
      team: user.team,
      wallet: user.wallet
    };
  }
}
