package com.example.TN_Blocage_MS.Agent;

import com.example.TN_Blocage_MS.entities.Compte;
import com.example.TN_Blocage_MS.entities.Transfert;
import com.example.TN_Blocage_MS.enums.EtatTransfert;
import com.example.TN_Blocage_MS.twilio.SMSController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@RestController
public class RestitutionAgent {
	@Autowired
	private RestTemplate restTemplate;
	
		@GetMapping("/test")
		public ResponseEntity<String> testNode() {
			return this.restTemplate.getForEntity("http://user-service", String.class);
		}
		@GetMapping("/restituer_transfert/{id}")
		public String restitution(@PathVariable Long id) {

			Transfert transfert=this.restTemplate.getForObject(
					 "http://Gestion/get_Transfert/"+id,Transfert.class);
			if(transfert.getEtat()!=EtatTransfert.à_servir & transfert.getEtat()!=EtatTransfert.débloqué_a_servir) {
				return "";

			}
			/*LocalDate date = LocalDate.now();
			@SuppressWarnings("deprecation")
			Date dateNow=new Date(date.toString());
			if(transfert.getDate_de_deblocage()!=dateNow) {
				return "Le transfert est bloqué";
			}*/
			Long idAgent= transfert.getAgent().getIdClient();

		      Compte compte=this.restTemplate.getForObject(
					 "http://Gestion/get_client_compte/"+idAgent,Compte.class);
		      compte.setMontant(compte.getMontant()+transfert.getMontant_operation());
		      modifySolde(compte);
		      transfert.setEtat(EtatTransfert.restitue);
		      
		      modifyTransfert(transfert);
		      if(transfert.isNotification()) {
					 sendSMS(transfert.getEmetteur().getTelephone(),"Votre transfert national a été restitué./n Le référence : "+transfert.getReference());
						 
				 }  
			
			
			return "Le transfert a été restitué";
		}
		public void modifySolde(Compte compte) {
			HttpHeaders headers = new HttpHeaders();
		    // set `content-type` header
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    // set `accept` header
		    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		    // create a post object
		   

		    // build the request
		    HttpEntity<Compte> entity = new HttpEntity<>(compte, headers);

		    // send PUT request to update compte
		    this.restTemplate.put("http://Gestion/update_Compte/{id}", entity, compte.getIdCompte());
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
