import {
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  position: string

  @IsNotEmpty()
  @IsNumber()
  assist: number

  @IsNotEmpty()
  @IsNumber()
  dribble: number

  @IsNotEmpty()
  @IsNumber()
  goals: number

  @IsNotEmpty()
  @IsString()
  club: string
}