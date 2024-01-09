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

import com.example.EmissionTransfertNational.entities.Transfert;
import com.example.EmissionTransfertNational.entities.TransfertMultiple;
import com.example.EmissionTransfertNational.repositories.TransfertMultipleRepository;
import com.example.EmissionTransfertNational.repositories.TransfertRepository;

@RestController @CrossOrigin("*")
public class TransfertMultipleRestController {
	private TransfertMultipleRepository transfertMultipleR;
	private TransfertRepository tR;
	public TransfertMultipleRestController(TransfertMultipleRepository transfertRep,TransfertRepository tRep){
			this.transfertMultipleR=transfertRep;
			this.tR=tRep;
	}
	@GetMapping(path="/get_TransfertMultiples")
	public List<TransfertMultiple>listTransfertMultiples(){
		return transfertMultipleR.findAll();
		
	}
	@GetMapping(path="/get_TransfertMultiple/{id}")
	public TransfertMultiple getTransfertMultiple(@PathVariable Long id){
		return transfertMultipleR.findById(id).get();
		
	}
	@PostMapping(path="/add_TransfertMultiple")
	public TransfertMultiple saveTransfertMultiple(@RequestBody TransfertMultiple transfertMultiple){
		List<Transfert>lt=transfertMultiple.getTransferts();
		transfertMultiple.setTransferts(null);
		transfertMultipleR.save(transfertMultiple);
		for(Transfert t:lt){
			t.setTransfertMultiple(transfertMultiple);
			tR.save(t);
		}
		return transfertMultipleR.save(transfertMultiple);
		
	}
	@PutMapping(path="/update_TransfertMultiple/{id}")
	public TransfertMultiple updateTransfertMultiple(@PathVariable Long id,@RequestBody TransfertMultiple transfertMultiple){
		transfertMultiple.setId(id);
		return transfertMultipleR.save(transfertMultiple);
		
	}
	@DeleteMapping(path="/delete_TransfertMultiple/{id}")
	public void deleteTransfertMultiple(@PathVariable Long id){
		transfertMultipleR.deleteById(id);
		
	}
}
