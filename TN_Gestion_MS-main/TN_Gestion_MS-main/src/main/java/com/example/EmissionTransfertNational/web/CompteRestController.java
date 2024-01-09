package com.example.EmissionTransfertNational.web;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.EmissionTransfertNational.entities.*;
import com.example.EmissionTransfertNational.repositories.*;
@RestController @CrossOrigin("*")
public class CompteRestController {
	private CompteRepository compteR;
	private ClientRepository clientR;
	public CompteRestController(ClientRepository clientR,CompteRepository compteR){
			this.clientR=clientR;
			this.compteR=compteR;
	}
	@GetMapping(path="/get_Comptes")
	public List<Compte>listComptes(){
		return compteR.findAll();
		
	}
	@GetMapping(path="/get_Compte/{id}")
	public Compte getCompte(@PathVariable Long id){
		return compteR.findById(id).get();
		
	}
	@PostMapping(path="/add_Compte")
	public Compte saveCompte(@RequestBody Compte compte){
		//le client existe deja
				Client client=compte.getClient();
				if(client!=null){
					//ajouter le client au compte
					compte.setClient(clientR.findByIdClient(client.getIdClient()));
					
					
				}
				
				
		return compteR.save(compte);
		
	}
	@PutMapping(path="/update_Compte/{id}")
	public Compte updateCompte(@PathVariable Long id,@RequestBody Compte nvcompte){
		nvcompte.setIdCompte(id);
		Compte compte=compteR.getById(id);
		if(nvcompte.getClient()!=null){//si on veut mettre a jour le client
			nvcompte.setClient(clientR.findByIdClient(nvcompte.getClient().getIdClient()));
		}
		else{
			nvcompte.setClient(compte.getClient());
		}
		return compteR.save(nvcompte);
		
	}
	@DeleteMapping(path="/delete_Compte/{id}")
	public void deleteCompte(@PathVariable Long id){
		compteR.deleteById(id);
		
	}
	@GetMapping(path="/get_client_compte/{id}")
	public Compte getClientCompte(@PathVariable Long id) {
		Client client=clientR.findByIdClient(id);
		List<Compte> comptes=compteR.findByClient(client);
		if(comptes.size()>0) {
		return  comptes.get(0);
		}
		else {
			return null;
		}
}
	
}
