import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import { PlayersService } from "./players.service";

@Controller ('players')
export class PlayersController {
constructor (private readonly playersService: PlayersService){

}

    @Post()
    async addPlayer(
        @Body('name') playName: string, 
        @Body('pos') playPos: string,
        @Body('speed') playSpeed: number,
        @Body('strength') playStrength: number,
) {

        const generatedId= await this.playersService.insertPlayer(
            playName, 
            playPos, 
            playSpeed,
            playStrength
        );
        console.log(generatedId)
        return {id: generatedId};
        
    }
    @Get()
    async getAllPlayers(){
        const players = await this.playersService.getPlayers();
        return players;
    }

    @Get(':id')
    getPlayer(@Param('id') playId: string, ){
        return this.playersService.getSinglePlayer(playId);
    }
    @Patch(':id')
    async updatePlayer(
        @Param('id') playId: string, 
        @Body('name') playName: string, 
        @Body ('pos') playPos: string,
        @Body('speed') playSpeed: number,
         @Body('strength') playStrength: number
    ){
       await this.playersService.updatePlayer(playId, playName, playPos, playSpeed, playStrength)
        return null;
    }
    @Delete(':id')
    async removePlayer(@Param('id') playId: string, ){
        await this.playersService.deletePlayer(playId);
        return null;
    }
}