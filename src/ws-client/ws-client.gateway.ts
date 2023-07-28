import { WebSocketGateway } from '@nestjs/websockets';
import { WsClientService, ClientType } from './ws-client.service';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UtilsService } from './../utils/utils.service';

export interface SocketQuery {
  clientId: string;
  type: `${ClientType}`;
}

@WebSocketGateway()
export class WsClientGateway {
  private logger: Logger = new Logger(WsClientGateway.name);

  constructor(
    private readonly wsClientService: WsClientService,
    private readonly utilsService: UtilsService,
  ) {
    //
  }

  handleConnection(socket: Socket) {
    this.logger.log(`client connected : ${socket.id}`);

    const queryData = socket.handshake.query as unknown;
    this.logger.log(`queryData : `, queryData);

    // 若資料無效，則中斷連線
    if (!this.utilsService.isSocketQueryData(queryData)) {
      socket.disconnect();
      return;
    }

    const { clientId, type } = queryData;

    this.wsClientService.putClient({
      socketId: socket.id,
      clientId,
      type,
    });
  }
}
