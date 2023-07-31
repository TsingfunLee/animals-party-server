import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { WsClientModule } from './ws-client/ws-client.module';
import { UtilsModule } from './utils/utils.module';
import { GameConsoleModule } from './game-console/game-console.module';
import { GameConsoleGateway } from './game-console/game-console.gateway';

@Module({
  imports: [RoomModule, WsClientModule, UtilsModule, GameConsoleModule],
  controllers: [AppController],
  providers: [AppService, GameConsoleGateway],
})
export class AppModule {
  //
}
