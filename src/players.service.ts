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
       
        return {id: player.id, title: player.title, description: player.desc, price: player.price };

    }
    async updatePlayer(playerId: string, name: string, pos: string, speed: number, strength: number){
        const updatedPlayer = await this.findPlayer(playerId);



            if(title){
            updatedProduct.title=title;
         }
           if(desc){
            updatedProduct.desc=desc;
        
         }
           if(price){
            updatedProduct.price=price;
         }
         
           updatedProduct.save();

        

    }
     async deleteProduct(prodId: string){
       const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException('Could not find Product.')
        }
        

    }

    private async findProduct(id:string): Promise<Product>{
        let product;
    try{
         product = await this.productModel.findById(id).exec();
    } catch(error){
        throw new NotFoundException('Could not find Product.');
        
    }
        if(!product){
            throw new NotFoundException('Could not find Product.');
        }
        return product;
    }
   
}