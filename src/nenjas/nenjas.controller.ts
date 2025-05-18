import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { CreateNenjaDto } from './dto/create-nenja.dto';
import { UpdateNenjasDto } from './dto/update-nenja.dto';
import { NenjasService } from './nenjas.service';

@Controller('nenjas')
export class NenjasController {
    constructor(private readonly ninjasService: NenjasService) {}
    @Get()
    get() {
        return this.ninjasService.find();
    }
}