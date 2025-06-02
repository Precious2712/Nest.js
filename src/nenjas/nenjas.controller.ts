import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Post
} from '@nestjs/common';
import { CreateNenjaDto } from './dto/create-nenja.dto';
import { NenjasService } from './nenjas.service';

@Controller('nenjas')
export class NenjasController {
    constructor(private readonly ninjasService: NenjasService) {}

    @Post()
    async create(@Body() CreateNenjaDto: CreateNenjaDto) {
        return this.ninjasService.createLeague(CreateNenjaDto);
    }

    @Get()
    async getAllLeagues() {
        try {
            return await this.ninjasService.getAll();
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}