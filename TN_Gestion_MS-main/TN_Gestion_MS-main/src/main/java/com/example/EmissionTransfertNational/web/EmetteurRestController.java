package com.example.EmissionTransfertNational.web;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmissionTransfertNational.entities.Beneficiaire;
import com.example.EmissionTransfertNational.entities.CarteDeCredit;
import com.example.EmissionTransfertNational.entities.Client;
import com.example.EmissionTransfertNational.entities.Compte;
import com.example.EmissionTransfertNational.entities.Emetteur;
import com.example.EmissionTransfertNational.entities.PieceIdentite;
import com.example.EmissionTransfertNational.entities.Wallet;
import com.example.EmissionTransfertNational.repositories.BeneficiaireRepository;
import com.example.EmissionTransfertNational.repositories.CarteDeCreditRepository;
import com.example.EmissionTransfertNational.repositories.CompteRepository;
import com.example.EmissionTransfertNational.repositories.EmetteurRepository;
import com.example.EmissionTransfertNational.repositories.PieceIdentiteRepository;
import com.example.EmissionTransfertNational.repositories.WalletRepository;
@RestController @CrossOrigin("*")
public class EmetteurRestController {
	private EmetteurRepository emetteurR;
	private CompteRepository cptR;
	private PieceIdentiteRepository pR;
	private WalletRepository wR;
	private BeneficiaireRepository bR;
	private CarteDeCreditRepository cdcR;
	public EmetteurRestController(BeneficiaireRepository bR,EmetteurRepository cR,PieceIdentiteRepository pR, CompteRepository cptR,WalletRepository wr,CarteDeCreditRepository cdcR){
			this.emetteurR=cR;
			this.cptR=cptR;
			this.bR=bR;
			this.pR=pR;
			this.wR=wr;
			this.cdcR=cdcR;
	}
	@GetMapping(path="/get_Emetteurs")
	public List<Emetteur>listEmetteurs(){
		return emetteurR.findAll();
		
	}
	@GetMapping(path="/get_Emetteur/{id}")
	public Emetteur getEmetteur(@PathVariable Long id){
		return emetteurR.findById(id).get();
		
	}
	
	@GetMapping(path="/getBenefs/{id}")
	public List<Beneficiaire> getBeneficiaires(@PathVariable Long id){
		Emetteur clientFind = emetteurR.findById(id).get();
		return clientFind.getBeneficiaires();
		
	}
	
	@PostMapping(path="/add_Emetteur")
	public Emetteur saveEmetteur(@RequestBody Emetteur emetteur){
		PieceIdentite pi=emetteur.getPiece_identite();
		emetteur.setRole("emetteur");
		emetteur.setTransferts(null);
		emetteur.setPassword("1234");
		if(pi!=null){
			pR.save(pi);
		}
		
		Wallet w=emetteur.getWallet();
		if(w!=null){
			List<CarteDeCredit>lcartes=w.getCartes();
			wR.save(w);
			if(lcartes!=null){
				for(CarteDeCredit cdc:lcartes){
					cdc.setWallet(w);
					cdcR.save(cdc);
				}
			}
			
			
		}
		 List<Compte>l=emetteur.getComptes();
		 if(l!=null){
		 for(Compte c:l){
			 System.out.println(c.toString());
			 c.setClient(emetteur);
			 cptR.save(c);
		 }
		 }
		 List<Beneficiaire>lb=emetteur.getBeneficiaires();
		 if(lb!=null){
			 System.out.println("liste des beneficiaires");
			 for(Beneficiaire b:lb){
				 //les beneficiaires existent deja
				 Beneficiaire ben=bR.findByIdClient(b.getIdClient());
				 if(ben!=null){
					 System.out.println("voici un beneficiaire");
				 }
				 List<Emetteur> lem=ben.getEmetteurs();
				 lem.add(emetteur);
				 ben.setEmetteurs(lem);
				 bR.save(ben);
			 }
		 }
		return emetteurR.save(emetteur);
		
	}
	
	@Transactional
	@PutMapping(path="/update_Emetteur/{id}")
	public Emetteur updateEmetteur(@PathVariable Long id,@RequestBody Emetteur neEmetteur){

	
		Emetteur benOriginal=emetteurR.getById(id);
		Beneficiaire lastBenef = new Beneficiaire();
		for(Beneficiaire b:neEmetteur.getBeneficiaires()) {
			lastBenef = b;
	}
		List<Beneficiaire> oldBenefs = benOriginal.getBeneficiaires();
//		oldBenefs.remove(oldBenefs.size()-1);
		
		Beneficiaire savedBenef = bR.save(lastBenef);
		oldBenefs.add(savedBenef);
		benOriginal.setBeneficiaires(oldBenefs);
		return benOriginal;
		
	}
	@DeleteMapping(path="/delete_Emetteur/{id}")
	public void deleteEmetteur(@PathVariable Long id){
		emetteurR.deleteById(id);
		
	}
}
