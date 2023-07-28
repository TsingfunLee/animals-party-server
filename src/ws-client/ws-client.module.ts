import { Module } from '@nestjs/common';
import { WsClientService } from './ws-client.service';
import { WsClientGateway } from './ws-client.gateway';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  providers: [WsClientGateway, WsClientService, UtilsService],
  exports: [WsClientService],
})
export class WsClientModule {
  //
}
