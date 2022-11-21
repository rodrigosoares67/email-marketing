import { Test, TestingModule } from '@nestjs/testing';
import { DestinatariosController } from './destinatarios.controller';
import { DestinatariosService } from './destinatarios.service';

describe('DestinatariosController', () => {
  let controller: DestinatariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinatariosController],
      providers: [DestinatariosService],
    }).compile();

    controller = module.get<DestinatariosController>(DestinatariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
