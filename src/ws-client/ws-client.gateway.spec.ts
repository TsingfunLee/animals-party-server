import { Test, TestingModule } from '@nestjs/testing';
import { WsClientGateway } from './ws-client.gateway';
import { WsClientService } from './ws-client.service';

describe('WsClientGateway', () => {
  let gateway: WsClientGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsClientGateway, WsClientService],
    }).compile();

    gateway = module.get<WsClientGateway>(WsClientGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
