package com.example.EmissionTransfertNational.web;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmissionTransfertNational.entities.Agent;
import com.example.EmissionTransfertNational.entities.Beneficiaire;
import com.example.EmissionTransfertNational.entities.CarteDeCredit;
import com.example.EmissionTransfertNational.entities.Compte;
import com.example.EmissionTransfertNational.entities.PieceIdentite;
import com.example.EmissionTransfertNational.entities.PointDeVente;
import com.example.EmissionTransfertNational.entities.Wallet;
import com.example.EmissionTransfertNational.repositories.AgentRepository;
import com.example.EmissionTransfertNational.repositories.BeneficiaireRepository;
import com.example.EmissionTransfertNational.repositories.CarteDeCreditRepository;
import com.example.EmissionTransfertNational.repositories.ClientRepository;
import com.example.EmissionTransfertNational.repositories.CompteRepository;
import com.example.EmissionTransfertNational.repositories.PieceIdentiteRepository;
import com.example.EmissionTransfertNational.repositories.PointDeVenteRepository;
import com.example.EmissionTransfertNational.repositories.WalletRepository;
@RestController @CrossOrigin("*")
public class BeneficiaireRestController {
	private BeneficiaireRepository beneficiaireR;
	private CompteRepository cptR;
	private PieceIdentiteRepository pR;
	private WalletRepository wR;
	private CarteDeCreditRepository cdcR;
	public BeneficiaireRestController(BeneficiaireRepository bR,PieceIdentiteRepository pR, CompteRepository cptR,WalletRepository wr,CarteDeCreditRepository cdcR){
		
		this.cptR=cptR;
		this.pR=pR;
		this.beneficiaireR=bR;
		this.wR=wr;
		this.cdcR=cdcR;
	}
	@GetMapping(path="/get_Beneficiaires")
	public List<Beneficiaire>listBeneficiaires(){
		return beneficiaireR.findAll();
		
	}
	@GetMapping(path="/get_Beneficiaire/{id}")
	public Beneficiaire getBeneficiaire(@PathVariable Long id){
		return beneficiaireR.findById(id).get();
		
	}
	@PostMapping(path="/add_Beneficiaire")
	public Beneficiaire saveBeneficiaire(@RequestBody Beneficiaire beneficiaire){
		
		
		PieceIdentite pi=beneficiaire.getPiece_identite();
		beneficiaire.setTransferts(null);
		beneficiaire.setRole("beneficiaire");
		beneficiaire.setEmetteurs(null);
		if(pi!=null){
			pR.save(pi);
		}
		
		Wallet w=beneficiaire.getWallet();
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
		 List<Compte>l=beneficiaire.getComptes();
		 if(l!=null){
			 beneficiaire.setComptes(null);
		 beneficiaireR.save(beneficiaire);
		 for(Compte c:l){
			 c.setClient(beneficiaire);
			 cptR.save(c);
		 }
		 }
		 
		return beneficiaireR.save(beneficiaire);
		
	}
	@PutMapping(path="/update_Beneficiaire/{id}")
	public Beneficiaire updateBeneficiaire(@PathVariable Long id,@RequestBody Beneficiaire nvBeneficiaire){
		nvBeneficiaire.setIdClient(id);
		nvBeneficiaire.setIdClient(id);
		Beneficiaire benOriginal=beneficiaireR.getById(id);
		nvBeneficiaire.setComptes(benOriginal.getComptes());
		nvBeneficiaire.setTransferts(benOriginal.getTransferts());
		nvBeneficiaire.setPiece_identite(benOriginal.getPiece_identite());
		nvBeneficiaire.setWallet(benOriginal.getWallet());
		
		return beneficiaireR.save(nvBeneficiaire);
		
	}
	@DeleteMapping(path="/delete_Beneficiaire/{id}")
	public void deleteBeneficiaire(@PathVariable Long id){
		beneficiaireR.deleteById(id);
		
	}
}