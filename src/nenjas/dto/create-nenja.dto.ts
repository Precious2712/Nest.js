import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class PlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsNumber()
  @Min(0)
  assist: number;

  @IsNumber()
  @Min(0)
  goals: number;

  @IsNumber()
  @Min(0)
  dribble: number;
}

class ClubDto {
  @IsString()
  @IsNotEmpty()
  club: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  players: PlayerDto[];
}

export class CreateNenjaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClubDto)
  leagueName: ClubDto[];
}