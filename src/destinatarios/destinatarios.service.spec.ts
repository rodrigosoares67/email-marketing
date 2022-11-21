import { Test, TestingModule } from '@nestjs/testing';
import { DestinatariosService } from './destinatarios.service';

describe('DestinatariosService', () => {
  let service: DestinatariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinatariosService],
    }).compile();

    service = module.get<DestinatariosService>(DestinatariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
