import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document<Types.ObjectId>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  firstname: string;

  @Prop({ required: true, trim: true })
  lastname: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: true, enum: ['England', 'France', 'Italy', 'Germany', 'Spain'] })
  countryClub: string;

  @Prop({ required: true })
  league: string;

  @Prop({ required: true })
  team: string;

  @Prop({ default: 0 })
  wallet: number;
}

export const UserSchema = SchemaFactory.createForClass(User);