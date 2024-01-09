package com.example.TN_Blocage_MS.Agent;

import com.example.TN_Blocage_MS.entities.Compte;
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
public class ExtourneTransfert {
	@Autowired
	  private RestTemplate restTemplate;
	@GetMapping("/extourner_transfert/{id}")
	public String extourne(@PathVariable Long id) {

		Transfert transfert=this.restTemplate.getForObject(
				 "http://Gestion/get_Transfert/"+id,Transfert.class);
		if(transfert.getEtat()!=EtatTransfert.à_servir && transfert.getEtat()!= EtatTransfert.débloqué_a_servir) {
			return "";
		}
		 
		Date dateNow=new Date();
		System.out.print("date now"+dateNow);
		System.out.print("Date transfert"+transfert.getDate_demission().getDate());
		if(transfert.getDate_demission().getDate()!=dateNow.getDate()) {
			return "Vous ne pouvez pas extourner ce transfert";
		}
		 Long idAgent= transfert.getAgent().getIdClient();
		 Compte compte=this.restTemplate.getForObject(
				 "http://Gestion/get_client_compte/"+idAgent,Compte.class);
		 compte.setMontant(compte.getMontant()+transfert.getMontant_operation());
		 modifySolde(compte);
		 transfert.setEtat(EtatTransfert.extourne);
		 modifyTransfert(transfert);
		 if(transfert.isNotification()) {
			 sendSMS(transfert.getEmetteur().getTelephone(),"Votre transfert national a été extouné./n Le référence : "+transfert.getReference());
				
		 }
		return "Le transfert a été bien extourné";
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
	    System.out.print("from function "+compte.getIdCompte());
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
