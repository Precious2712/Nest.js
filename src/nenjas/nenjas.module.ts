import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NenjasService } from './nenjas.service';
import { NenjasController } from './nenjas.controller';
import { League, LeagueSchema } from './leagues/country-league-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: League.name, schema: LeagueSchema }
    ])
  ],
  controllers: [NenjasController],
  providers: [NenjasService]
})
export class NenjasModule {}