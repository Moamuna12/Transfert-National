import { Client } from "./Client.model";
import { TypeCompte } from "./enums/TypeCompte.model";

export class Compte{
    idCompte:number=0;
    montant:number=0.0;
    client:Client=new Client;
    date_ouverture:Date=new Date;
    type:TypeCompte=TypeCompte.commission;
}