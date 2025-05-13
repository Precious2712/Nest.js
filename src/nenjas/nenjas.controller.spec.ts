import { Test, TestingModule } from '@nestjs/testing';
import { NenjasController } from './nenjas.controller';

describe('NenjasController', () => {
  let controller: NenjasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NenjasController],
    }).compile();

    controller = module.get<NenjasController>(NenjasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
