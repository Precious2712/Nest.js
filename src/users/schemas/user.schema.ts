import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, trim: true })
  firstname: string;

  @Prop({ required: true, trim: true })
  lastname: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  countryClub: string;
  enum: ['England, France, Italy, Germany, Spain']

  @Prop({ required: true })
  league: string;

  @Prop({
    required: true
  })
  team: string;

  @Prop({ default: 0 })
  wallet: number;
}

export const UserSchema = SchemaFactory.createForClass(User);