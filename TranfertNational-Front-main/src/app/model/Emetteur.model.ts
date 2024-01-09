import { Beneficiaire } from "./Beneficiare.model";
import { Client } from "./Client.model";
import { Transfert } from "./Transfert.model";

export class Emetteur extends Client{
    limite_somme_transfert:number=0.0;
    nbr_transfert_envoyes:number=0;
    transfert?:Transfert;
    beneficiaires?:Array<Beneficiaire>;
}