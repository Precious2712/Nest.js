import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet extends Document {
    @Prop({
        required: true,
        // message: 'name is required'
    })
    name: string;

    @Prop({
        required: true
    })
    price: number;

    @Prop({
        required: true
    })
    position: string;

    @Prop({
        required: true
    })
    assist: number;

    @Prop({
        required: true
    })
    dribble: number;

    @Prop({
        required: true
    })
    goals: number;

    @Prop({
        required: true
    })
    club: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);