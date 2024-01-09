import { CarteDeCredit } from "./CarteDeCredit.model"
import { Client } from "./Client.model";

export class Wallet{
    id:number=0;
    client:Client=new Client;
    cartes?:Array<CarteDeCredit>;
}