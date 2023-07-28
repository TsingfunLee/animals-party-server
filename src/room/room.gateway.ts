import { WebSocketGateway } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { UtilsService } from 'src/utils/utils.service';
import { WsClientService } from 'src/ws-client/ws-client.service';
import { ClientSocket } from 'types/socket.type';

@WebSocketGateway()
export class RoomGateway {
  constructor(
    private readonly roomService: RoomService,
    private readonly utilsService: UtilsService,
    private readonly wsClientService: WsClientService,
  ) {}

  handleConnection(socket: ClientSocket) {
    const queryData = socket.handshake.query as unknown;

    if (!this.utilsService.isSocketQueryData(queryData)) return;

    const { clientId, type } = queryData;

    if (type !== 'game-console') return;

    const room = this.roomService.addRoom(clientId);

    /** 加入 Socket.IO 提供的 room 功能，
     * 這樣可以簡單輕鬆的對所有成員廣播資料
     *
     * https://socket.io/docs/v4/rooms/#default-room
     */
    socket.join(room.id);

    /** 發送房間建立成功事件 */
    socket.emit('game-console:room-created', room);
  }
  handleDisconnect(socket: ClientSocket) {
    const client = this.wsClientService.getClient({
      socketId: socket.id,
    });
    if (!client) return;

    if (client.type === 'game-console') {
      this.roomService.deleteRooms(client.id);
      return;
    }

    if (client.type === 'player') {
      this.roomService.deletePlayer(client.id);
      return;
    }
  }
}
