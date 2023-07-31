import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameConsoleService } from './game-console.service';
import { UtilsService } from 'src/utils/utils.service';
import { WsClientService } from 'src/ws-client/ws-client.service';
import { RoomService } from 'src/room/room.service';
import { Logger } from '@nestjs/common';
import {
  ClientSocket,
  OnEvents,
  EmitEvents,
  SocketResponse,
} from 'types/socket.type';
import { UpdateGameConsoleState, GameConsoleState } from './game-console.type';

@WebSocketGateway()
export class GameConsoleGateway {
  private logger: Logger = new Logger(GameConsoleGateway.name);
  private roomService: RoomService = new RoomService();

  @WebSocketServer()
  private server!: Server<OnEvents, EmitEvents>;

  constructor(
    private readonly gameConsoleService: GameConsoleService,
    private readonly utilsService: UtilsService,
    private readonly wsClientService: WsClientService,
  ) {
    //
  }

  @SubscribeMessage<keyof OnEvents>('game-console:state-update')
  async handleGameConsoleStateUpdate(
    socket: ClientSocket,
    state: UpdateGameConsoleState,
  ) {
    const client = this.wsClientService.getClient({
      socketId: socket.id,
    });
    if (!client) return;

    const { status, gameName } = state;

    this.gameConsoleService.setState(client.id, { status, gameName });

    // 廣播狀態
    this.gameConsoleService.broadcastState(client.id, this.server);
  }

  @SubscribeMessage<keyof OnEvents>('player:request-game-console-state')
  async handleRequestState(socket: ClientSocket) {
    const client = this.wsClientService.getClient({
      socketId: socket.id,
    });
    if (!client) {
      const result: SocketResponse = {
        status: 'err',
        message: '此 socket 不存在 client',
      };
      return result;
    }

    const room = this.roomService.getRoom({
      playerId: client.id,
    });
    if (!room) {
      const result: SocketResponse = {
        status: 'err',
        message: 'client 未加入任何房間',
      };
      return result;
    }

    const state = this.gameConsoleService.getState(room.founderId);
    if (!state) {
      const result: SocketResponse = {
        status: 'err',
        message: '此房間之 game-console 不存在 state',
      };
      return result;
    }

    socket.emit('game-console:state-update', state);

    const result: SocketResponse<GameConsoleState> = {
      status: 'suc',
      message: '取得 state 成功',
      data: state,
    };
    return result;
  }
}
