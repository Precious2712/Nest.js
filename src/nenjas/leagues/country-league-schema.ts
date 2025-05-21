import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Player {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  assist: number;

  @Prop({ required: true })
  goals: number;

  @Prop({ required: true })
  dribble: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

@Schema()
export class LeagueName {
  @Prop({ required: true })
  club: string;

  @Prop({ type: [PlayerSchema], default: [] })
  players: Player[];
}

export const LeagueNameSchema = SchemaFactory.createForClass(LeagueName);

@Schema()
export class League extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [LeagueNameSchema], default: [] })
  leagueName: LeagueName[];

  // @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  // user: Types.ObjectId;
}

export const LeagueSchema = SchemaFactory.createForClass(League);