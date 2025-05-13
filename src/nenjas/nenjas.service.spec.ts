import { Test, TestingModule } from '@nestjs/testing';
import { NenjasService } from './nenjas.service';

describe('NenjasService', () => {
  let service: NenjasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NenjasService],
    }).compile();

    service = module.get<NenjasService>(NenjasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
