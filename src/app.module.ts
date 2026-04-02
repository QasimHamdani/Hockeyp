import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [PlayersModule, MongooseModule.forRoot('mongodb+srv://qasimhamdani26:apple@cluster0.dvibg4n.mongodb.net/nestjs-demo')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

