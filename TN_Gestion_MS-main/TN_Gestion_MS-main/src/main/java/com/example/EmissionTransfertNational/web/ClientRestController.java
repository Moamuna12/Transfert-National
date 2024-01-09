package com.example.EmissionTransfertNational.web;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.EmissionTransfertNational.entities.*;
import com.example.EmissionTransfertNational.enums.TypeCompte;
import com.example.EmissionTransfertNational.repositories.*;


@RestController @CrossOrigin("*")
public class ClientRestController {
	private ClientRepository clientR;
	private CompteRepository cptR;
	private PieceIdentiteRepository pR;
	private WalletRepository wR;
	private CarteDeCreditRepository cdcR;
	public ClientRestController(ClientRepository cR,PieceIdentiteRepository pR, CompteRepository cptR,WalletRepository wr,CarteDeCreditRepository cdcR){
			this.clientR=cR;
			this.cptR=cptR;
			this.pR=pR;
			this.wR=wr;
			this.cdcR=cdcR;
	}
	@GetMapping(path="/get_clients")
	public List<Client>listClients(){
		return clientR.findAllClientsOnly();
	}
	

	@PostMapping(path="/login")
	public Client login(@RequestBody Client client) {
		Client clientFind = clientR.findByEmailAndPassword(client.getEmail(), client.getPassword());
		if(clientFind == null) {
			return null;
		}else {
			return clientFind;
		}
	}
	@GetMapping(path="/get_client/{id}")
	public Client getClient(@PathVariable Long id){
		return clientR.findById(id).get();
		
	}
	@PostMapping(path="/add_client")
	public Client saveClient(@RequestBody Client client){
		PieceIdentite pi=client.getPiece_identite();
		if(pi!=null){
			pR.save(pi);
		}
		client.setPassword("123");
		Wallet w=client.getWallet();
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
		 List<Compte>l=client.getComptes();
		 if(l!=null){
			 client.setComptes(null);
		 clientR.save(client);
		 for(Compte c:l){
			 c.setClient(client);
			 cptR.save(c);
		 }
		 }
		 
		return clientR.save(client);
	}



	@PutMapping(path="/update_client/{id}")
	public Client updateClient(@PathVariable Long id,@RequestBody Client nvClient){
		nvClient.setIdClient(id);
		Client cOriginal=clientR.getById(id);
		if(nvClient.getPiece_identite()!=null){
			nvClient.setPiece_identite(pR.getById(nvClient.getPiece_identite().getId()));
		}else{
			nvClient.setPiece_identite(cOriginal.getPiece_identite());
		}
		nvClient.setComptes(cOriginal.getComptes());
		if(nvClient.getWallet()!=null){
			nvClient.setWallet(wR.getById(nvClient.getWallet().getId()));
		}else{
			nvClient.setWallet(cOriginal.getWallet());
		}
		
		return clientR.save(nvClient);
		
	}
	@DeleteMapping(path="/delete_client/{id}")
	public void deleteClient(@PathVariable Long id){
		clientR.deleteById(id);
		
	}
	
		
}
