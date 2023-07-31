import { Test, TestingModule } from '@nestjs/testing';
import { GameConsoleService } from './game-console.service';

describe('GameConsoleService', () => {
  let service: GameConsoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameConsoleService],
    }).compile();

    service = module.get<GameConsoleService>(GameConsoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
