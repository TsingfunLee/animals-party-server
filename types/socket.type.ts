import { Socket } from 'socket.io';
import { Room } from 'src/room/room.service';

interface OnEvents {
  '': () => void;
}

interface EmitEvents {
  'game-console:room-created': (data: Room) => void;
}

export type ClientSocket = Socket<OnEvents, EmitEvents>;
