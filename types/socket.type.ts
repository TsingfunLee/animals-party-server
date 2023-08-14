import { Socket } from 'socket.io';
import { Room } from 'src/room/room.service';
import {
  UpdateGameConsoleState,
  GameConsoleState,
  Player,
} from 'src/game-console/game-console.type';
import { GamepadData } from './player.type';
export interface OnEvents {
  'player:join-room': (data: Room) => void;
  'player:request-game-console-state': () => void;
  'game-console:state-update': (data: UpdateGameConsoleState) => void;
  'game-console:player-update': (data: Player[]) => void;
  'player:gamepad-data': (data: GamepadData) => void;
}

export interface EmitEvents {
  'game-console:room-created': (data: Room) => void;
  'game-console:state-update': (data: GameConsoleState) => void;
  'game-console:player-update': (data: Player[]) => void;
  'player:gamepad-data': (data: GamepadData) => void;
}

export interface SocketResponse<T = undefined> {
  status: 'err' | 'suc';
  message: string;
  data?: T;
  error?: any;
}

export type ClientSocket = Socket<OnEvents, EmitEvents>;
