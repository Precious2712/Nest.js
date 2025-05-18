import { PartialType } from '@nestjs/mapped-types';
import { CreateNenjaDto } from './create-nenja.dto';

export class UpdateNenjasDto extends PartialType(CreateNenjaDto) {}