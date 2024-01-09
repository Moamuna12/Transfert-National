package com.example.EmissionMS.FromClientAccount;

import com.example.EmissionMS.entities.Transfert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
public class FromAccountController {
	 @Autowired
	private FromAccountService service;
	
	
	@PutMapping("/fromClientAccount/{id}")
	public String fromAccount(@RequestBody Transfert transfert, @PathVariable Long id) {
		return service.EmiTransfert(transfert,id);
	}
}
