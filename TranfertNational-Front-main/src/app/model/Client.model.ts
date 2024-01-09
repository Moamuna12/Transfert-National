import {PieceIdentite} from "./PieceIdentite.model";
import{Compte} from "./Compte.model";
import{TypeClient} from "./enums/TypeClient.model"
import{Sexe} from "./enums/Sexe.model"
import { Wallet } from "./Wallet.model";
export class Client{
    idClient:number;
    nom:String="";
    prenom:String="";
    telephone:String="+212";
    piece_identite?:PieceIdentite;
    comptes?: Array<Compte>;
    type:TypeClient=TypeClient.partenaire;
    sexe:Sexe=Sexe.M;
    profession:String="";
    pays_d_adresse:String="Maroc";
    adresselegale:String="";
    email:String="";
    wallet?:Wallet;
    ville:String="";
    role:String="";
    

}

