package com.example.EmissionTransfertNational.web;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.EmissionTransfertNational.entities.*;
import com.example.EmissionTransfertNational.repositories.*;
@RestController @CrossOrigin("*")
public class CarteDeCreditRestController {
	private CarteDeCreditRepository carteDeCreditR;
	private WalletRepository wR;
	public CarteDeCreditRestController(CarteDeCreditRepository cR,WalletRepository wR){
			this.carteDeCreditR=cR;
			this.wR=wR;
	}
	@GetMapping(path="/get_CarteDeCredits")
	public List<CarteDeCredit>listCarteDeCredits(){
		return carteDeCreditR.findAll();
		
	}
	@GetMapping(path="/get_CarteDeCredit/{id}")
	public CarteDeCredit getCarteDeCredit(@PathVariable Long id){
		return carteDeCreditR.findById(id).get();
		
	}
	@PostMapping(path="/add_CarteDeCredit")
	public CarteDeCredit saveCarteDeCredit(@RequestBody CarteDeCredit cdc){
		//le wallet existe deja
		Wallet wallet=cdc.getWallet();
		if(wallet!=null){
			//ajouter la carte au wallet
			cdc.setWallet(wR.getById(wallet.getId()));
			
		}
		
		return carteDeCreditR.save(cdc);
		
	}
	@PutMapping(path="/update_CarteDeCredit/{id}")
	public CarteDeCredit updateCarteDeCredit(@PathVariable Long id,@RequestBody CarteDeCredit nvcarte){
		nvcarte.setId(id);
		CarteDeCredit cdc=carteDeCreditR.getById(id);
		if(nvcarte.getWallet()!=null){//si on veut mettre a jour le wallet
			nvcarte.setWallet(wR.getById(nvcarte.getWallet().getId()));
		}
		else{
			nvcarte.setWallet(cdc.getWallet());
		}
		
		return carteDeCreditR.save(nvcarte);
		
	}
	@DeleteMapping(path="/delete_CarteDeCredit/{id}")
	public void deleteCarteDeCredit(@PathVariable Long id){
		carteDeCreditR.deleteById(id);
		
	}
}
