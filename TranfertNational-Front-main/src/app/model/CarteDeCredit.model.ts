import { Wallet } from "./Wallet.model";

export class CarteDeCredit{
    id:number;
    wallet:Wallet=new Wallet;
    montant:number=0;
    date_expiration:Date=new Date;
}