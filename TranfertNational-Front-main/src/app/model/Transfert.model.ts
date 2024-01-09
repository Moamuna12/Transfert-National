import { Agent } from "./Agent.model";
import { Beneficiaire } from "./Beneficiare.model";
import { Emetteur } from "./Emetteur.model";
import { EtatTransfert } from "./enums/EtatTransfert.model";
import { MotifTransfert } from "./enums/MotifTransfert.model";
import { TypeTransfert } from "./enums/TypeTransfert.model";
import { LieuDeTravail } from "./LieuDeTravail.model"
import { TransfertMultiple } from "./TransfertMultiple.model";

export class Transfert{
    id:number=0;
    reference:String="";
    codePin:String="";
    type:TypeTransfert=TypeTransfert.en_especes;
    etat:EtatTransfert=EtatTransfert.à_servir;
    delai_de_validite:Date=new Date;
    delai_de_desherence:Date=new Date;
    date_demission:Date=new Date;
    date_de_blocage?:Date;
    date_de_deblocage?:Date;
    montant_transfert:number=0;
    montant_operation:number=0;
    comission:number=0;
    frais:number=0;
    emetteur?:Emetteur;
    agent?:Agent;
    pays_d_emission:String="Maroc";
    beneficiaire?:Beneficiaire;
    motif:MotifTransfert=MotifTransfert.Frais_de_dépassement;
    transfertMultiple?:TransfertMultiple;
    notification:boolean=false;
    lieuDeService?:LieuDeTravail;
    lieuDeDemande?:LieuDeTravail;
}