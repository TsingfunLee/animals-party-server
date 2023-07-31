import { Test, TestingModule } from '@nestjs/testing';
import { GameConsoleGateway } from './game-console.gateway';

describe('GameConsoleGateway', () => {
  let gateway: GameConsoleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameConsoleGateway],
    }).compile();

    gateway = module.get<GameConsoleGateway>(GameConsoleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
