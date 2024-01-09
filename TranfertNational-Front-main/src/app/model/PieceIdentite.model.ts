import { Client } from "./Client.model";
import { TypePieceIdentite } from "./enums/TypePieceIdentite.model";

export class PieceIdentite{
    //id:number=0;
    type_piece_identite:TypePieceIdentite=TypePieceIdentite.carteNationale;
    numero:String="MAR34342";
    date_de_naissance:Date=new Date;
    pays:String="";
    //client:Client=new Client;
    date_d_expiration:Date=new Date;
}