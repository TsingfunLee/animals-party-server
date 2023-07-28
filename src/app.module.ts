import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { WsClientModule } from './ws-client/ws-client.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [RoomModule, WsClientModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //
}
