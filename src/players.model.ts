import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    name: {type : String, required: true},
    pos: {type : String, required: true},
    speed: {type : Number, required: true},
    strength: {type : Number, required: true},
});


export interface Player extends mongoose.Document{

         id: string;
         name: string;
         pos: string ;
         speed: number;
         strength: number;
     
}