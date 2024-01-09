import { Transfert } from "./Transfert.model";

export class LieuDeTravail{
    id:number=0;
    numero_de_ville:number=0;
    ville:String="";
    pays:String="Maroc";
    transfert_demandes?:Array<Transfert>;
    transert_servis?:Array<Transfert>;
}