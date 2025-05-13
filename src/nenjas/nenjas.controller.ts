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
    // Get /nenjas?type == fast(qery-selector) routes
    @Get()
    getNenjas(@Query('name') name:'top') {
        // const service = new NenjasService();
        return this.ninjasService.getNenjas(name);
    }

    // Get /nenjas/:id routes

    @Get(':id')
    getOneNenjas(@Param('id') id: string) {
        return this.ninjasService.getNenja(+id)
    }

    // post request /nenjas

    @Post()
    createNenjas(@Body() createNenjaDto: CreateNenjaDto) {
        return this.ninjasService.createNenjas(createNenjaDto)
    }

    // put request /nenjas/:id

    @Put(':id')
    updateNenjas(@Param('id') id: number, @Body() updateNenjaDto: UpdateNenjasDto) {
        return this.ninjasService.updateNenjas(+id, updateNenjaDto)
    }

    // delete request /nenjas/:id

    @Delete(':id')
    removeNenjas(@Param('id') id: number) {
        return this.ninjasService.removeNenja(id)
    }
}
