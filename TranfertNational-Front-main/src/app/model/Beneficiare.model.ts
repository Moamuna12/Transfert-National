import { Client } from "./Client.model";
import { Emetteur } from "./Emetteur.model";
import { Transfert } from "./Transfert.model";

export class Beneficiaire extends Client{
    idBeneficiaire?:number;
    // nbr_transfert_recus:number=0;
    transfert?:Transfert;
    emetteur?:Emetteur;

}