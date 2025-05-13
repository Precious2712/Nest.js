import { Module } from '@nestjs/common';
import { NenjasController } from './nenjas.controller';
import { NenjasService } from './nenjas.service';

@Module({
  controllers: [NenjasController],
  providers: [NenjasService]
})
export class NenjasModule {}
