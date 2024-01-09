import { Client } from "./Client.model";
import { PointDeVente } from "./PointDeVente.model";
import { Transfert } from "./Transfert.model";

export class Agent extends Client{
    salary:number=0.0;
    pointdevente?:PointDeVente;
    transfert?:Transfert[];
}