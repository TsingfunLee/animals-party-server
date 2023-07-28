import { Injectable, Logger } from '@nestjs/common';
import { ClientId } from 'src/ws-client/ws-client.service';
import { customAlphabet } from 'nanoid';

/** 房間 ID，6 位數字組成 */
export type RoomId = string;

export interface Room {
  id: RoomId;
  founderId: ClientId;
  playerIds: ClientId[];
}

export type GetRoomParams = { founderId: string } | { playerId: string };

const createRoomId = customAlphabet('1234567890', 6);

@Injectable()
export class RoomService {
  private logger: Logger = new Logger(RoomService.name);
  roomsMap = new Map<RoomId, Room>();
  addRoom(clientId: string) {
    let roomId = createRoomId();
    while (this.roomsMap.has(roomId)) {
      roomId = createRoomId();
    }

    const newRoom = {
      id: roomId,
      founderId: clientId,
      playerIds: [],
    };
    this.roomsMap.set(roomId, newRoom);

    this.logger.log(`created room : `, newRoom);

    return newRoom;
  }
  getRoom(params: GetRoomParams) {
    const result = [...this.roomsMap.values()].find((room) => {
      if ('founderId' in params) {
        return room.founderId === params.founderId;
      }

      return room.playerIds.includes(params.playerId);
    });

    return result;
  }
  hasRoom(roomId: string) {
    return this.roomsMap.has(roomId);
  }
  deleteRooms(founderId: string) {
    const rooms = [...this.roomsMap.values()].filter(
      (room) => room.founderId === founderId,
    );

    rooms.forEach(({ id }) => {
      this.roomsMap.delete(id);
    });
  }
  deletePlayer(clientId: string) {
    this.roomsMap.forEach((room, key) => {
      const index = room.playerIds.indexOf(clientId);
      if (index < 0) return;

      room.playerIds.splice(index, 1);
      this.roomsMap.set(key, room);
    });
  }
}