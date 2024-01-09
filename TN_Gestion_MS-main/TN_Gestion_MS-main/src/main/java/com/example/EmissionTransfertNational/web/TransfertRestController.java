package com.example.EmissionTransfertNational.web;

import java.util.List;

import com.example.EmissionTransfertNational.entities.Beneficiaire;
import com.example.EmissionTransfertNational.repositories.BeneficiaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.EmissionTransfertNational.entities.Emetteur;
import com.example.EmissionTransfertNational.entities.Transfert;
import com.example.EmissionTransfertNational.repositories.EmetteurRepository;
import com.example.EmissionTransfertNational.repositories.TransfertRepository;

@RestController @CrossOrigin("*")
public class TransfertRestController {
	@Autowired
	private EmetteurRepository eR;
	@Autowired
	private BeneficiaireRepository bR;
	@Autowired
	private TransfertRepository tR;
	public TransfertRestController(TransfertRepository cR,EmetteurRepository eR){
		this.tR=cR;
		this.eR=eR;
	}
	@GetMapping(path="/get_Transferts")
	public List<Transfert>listTransferts(){
		return tR.findAll();

	}
	@GetMapping(path="/get_Transfert/{id}")
	public Transfert getTransfert(@PathVariable Long id){
		return tR.findById(id).get();

	}

	@GetMapping(path="/getTransferts/{id}")
	public List<Transfert> getTransfertByEmetteur(@PathVariable long id) {
		long idd = 8;
		return tR.findByEmetteur_idClient(idd);

	}
	@PostMapping(path="/add_Transfert")
	public Transfert saveTransfert(@RequestBody Transfert transfert){
		Emetteur em=transfert.getEmetteur();

		// Check if the beneficiaire is null or already persistent
		Beneficiaire beneficiaire = transfert.getBeneficiaire();
		if (beneficiaire != null) {
			// Save the beneficiaire if it's not yet persistent
			bR.save(beneficiaire);
		}

		tR.save(transfert);

		return transfert;
	}

	@PutMapping(path="/update_Transfert/{id}")
	public Transfert updateTransfert(@PathVariable Long id,@RequestBody Transfert cl){
		cl.setId(id);

		return tR.save(cl);

	}


	@DeleteMapping(path="/delete_Transfert/{id}")
	public void deleteTransfert(@PathVariable Long id){
		tR.deleteById(id);

	}
}
