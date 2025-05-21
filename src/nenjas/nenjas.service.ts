import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNenjaDto } from './dto/create-nenja.dto';
import { League } from './leagues/country-league-schema';

@Injectable()
export class NenjasService {
    constructor(
        @InjectModel(League.name) private leagueModel: Model<League>
    ) {}

    async createLeague(createNenjaDto: CreateNenjaDto): Promise<League> {
        const { country, name, leagueName } = createNenjaDto;

        let existingLeague = await this.leagueModel.findOne({ country, name });

        if (!existingLeague) {
            const newLeague = new this.leagueModel({
                country,
                name,
                leagueName,
            });
            return await newLeague.save();
        }

        for (const incomingClub of leagueName) {
            const existingClub = existingLeague.leagueName.find(
                (club) => club.club === incomingClub.club
            );

            if (!existingClub) {
                existingLeague.leagueName.push(incomingClub);
            } else {
                existingClub.players.push(...incomingClub.players);
            }
        }

        return await existingLeague.save();
    }
}