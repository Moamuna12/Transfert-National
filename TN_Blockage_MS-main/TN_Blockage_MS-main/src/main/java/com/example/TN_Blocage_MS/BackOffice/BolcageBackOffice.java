package com.example.TN_Blocage_MS.BackOffice;


import com.example.TN_Blocage_MS.entities.Transfert;
import com.example.TN_Blocage_MS.enums.EtatTransfert;
import com.example.TN_Blocage_MS.twilio.SMSController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Date;

@RestController
public class BolcageBackOffice {
	@Autowired
	private RestTemplate restTemplate;
		@GetMapping("/bloquer_transfert/{id}")
		public String bloquerTransfert(@PathVariable Long id) {
			Transfert transfert=this.restTemplate.getForObject(
					 "http://Gestion/get_Transfert/"+id,Transfert.class);
			if(transfert.getEtat()!= EtatTransfert.à_servir) {
				return "Vous ne pouvez pas bloqué ce transfert";
			}
			transfert.setEtat(EtatTransfert.bloque);
			Date dateNow=new Date();
			transfert.setDate_de_blocage(dateNow);
			modifyTransfert(transfert);
			return "Le transfert est bloqué.";
		}
		@GetMapping("/debloquer_transfert/{id}")
		public String debloquerTransfert(@PathVariable Long id) {
			Transfert transfert=this.restTemplate.getForObject(
					 "http://Gestion/get_Transfert/"+id,Transfert.class);
			if(transfert.getEtat()!=EtatTransfert.bloque) {
				return "Le transfert n'est pas bloqué.";
			}
			Date dateNow=new Date();
			transfert.setDate_de_deblocage(dateNow);
			transfert.setEtat(EtatTransfert.débloqué_a_servir);
			modifyTransfert(transfert);
			return "Le transfert est débloqué.";
		}
		
		
		
		public void modifyTransfert(Transfert transfert) {
			HttpHeaders headers = new HttpHeaders();
		    // set `content-type` header
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    // set `accept` header
		    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		    // create a post object
		   

		    // build the request
		    HttpEntity<Transfert> entity = new HttpEntity<>(transfert, headers);

		    // send PUT request to update compte
		    this.restTemplate.put("http://Gestion/update_Transfert/{id}", entity, transfert.getId());
		}
		public void sendSMS(String num,String msg) {
			
			   
		    SMSController.sendMessages(num, msg);
		    
		}

}


