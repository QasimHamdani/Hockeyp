import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import{ Player } from './players.model'

@Injectable()
export class PlayersService{
    private players: Player[] = [];

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>){}

    async insertPlayer(name: string, pos: string, speed: number, strength: number){
    const newPlayer = new this.playerModel( {name: name, pos: pos, speed: speed, strength: strength})
    const result = await newPlayer.save();
    console.log(result);

    return result.id as string;
    }

    async getPlayers(){
        const players = await this.playerModel.find().exec();
    
        return players.map((play) => ({id: play.id, name: play.name, pos: play.pos, speed: play.speed, strength: play.strength }));
    }

    async getSinglePlayer(playerId: string){
        const player = await this.findPlayer(playerId);
       
        return {id: player.id, name: player.name, pos: player.pos, speed: player.speed, strength: player.strength };

    }
    async updatePlayer(playerId: string, name: string, pos: string, speed: number, strength: number){
        const updatedPlayer = await this.findPlayer(playerId);



            if(name){
            updatedPlayer.name=name;
         }
           if(pos){
            updatedPlayer.pos=pos;
        
         }
           if(speed){
            updatedPlayer.speed=speed;
         }
          if(strength){
            updatedPlayer.strength=strength;
         }
         
           updatedPlayer.save();

        

    }
     async deletePlayer(playId: string){
       const result = await this.playerModel.deleteOne({_id: playId}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException('Could not find Product.')
        }
        

    }

    private async findPlayer(id:string): Promise<Player>{
        let player;
    try{
         player = await this.playerModel.findById(id).exec();
    } catch(error){
        throw new NotFoundException('Could not find Player.');
        
    }
        if(!player){
            throw new NotFoundException('Could not find Player.');
        }
        return player;
    }
   
}