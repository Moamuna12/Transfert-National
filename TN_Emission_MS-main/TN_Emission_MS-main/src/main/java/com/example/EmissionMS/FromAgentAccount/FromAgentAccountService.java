package com.example.EmissionMS.FromAgentAccount;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

import com.example.EmissionMS.entities.Agent;
import com.example.EmissionMS.entities.Compte;

import com.example.EmissionMS.entities.Transfert;
import com.example.EmissionMS.enums.EtatTransfert;
import com.example.EmissionMS.enums.TypeFrais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.example.EmissionMS.Twilio.SMSController;
import org.springframework.web.client.RestTemplate;

@Service
public class FromAgentAccountService {
	@Autowired
	private RestTemplate restTemplate;
	public Agent[] get() {
		return this.restTemplate.getForObject("http://Gestion/get_Agents", Agent[].class);
	}
	public String EmiTransfert(Transfert transfert, Long id){
		try {
			transfert.setReference("EDP837AG" + id + ThreadLocalRandom.current().nextInt(000000, 200000));
			transfert.setAgent(this.restTemplate.getForObject("http://Gestion/get_Agent/" + id, Agent.class));
			transfert.setEtat(EtatTransfert.à_servir);
			Date dateNow = new Date();
			transfert.setDate_demission(dateNow);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			calendar.add(Calendar.DATE, 70);
			transfert.setDelai_de_validite(calendar.getTime());
			double montant = transfert.getMontant_transfert();
			Compte compte = this.restTemplate.getForObject(
					"http://Gestion/get_client_compte/" + id, Compte.class);

			double solde = compte.getMontant();
			System.out.println(solde);

			TypeFrais typeFrais = transfert.getFrais();
			if (typeFrais == TypeFrais.parClient) {
				transfert.setMontant_operation(montant + 30);

			} else if (typeFrais == TypeFrais.parBeneficiaire) {
				transfert.setMontant_operation(montant);
				transfert.setMontant_transfert(montant - 30);

			} else if (typeFrais == TypeFrais.partages) {
				transfert.setMontant_operation(montant + 15);
				transfert.setMontant_transfert(montant - 15);
			}
			double montantTrans = transfert.getMontant_operation();
			if (montantTrans > 80000) {

				return "Le montant du transfert ne doit pas dépasser le plafand maximal";

			}
			if (montantTrans > solde) {
				return "Le solde du compte est insuffisant";
			}
			compte.setMontant(solde - montantTrans);
			System.out.println(compte.getMontant());
			modifySolde(compte);
			addTransfert(transfert);
			if (transfert.isNotification()) {
				System.out.println("Vous avez recu un transfert national./n Le référence : " + transfert.getReference());
				//sendSMS(transfert.getBeneficiaire().getTelephone(), "Vous avez recu un transfert national./n Le référence : " + transfert.getReference());
			}
			return "Le transfert a été bien ajouté.";
		}catch (Exception e) {
			e.printStackTrace();
			return "Une erreur s'est produite lors du traitement du transfert.";
		}

	}
	public void modifySolde(Compte compte) {
		HttpHeaders headers = new HttpHeaders();
		// set content-type header
		headers.setContentType(MediaType.APPLICATION_JSON);
		// set accept header
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		// create a post object


		// build the request
		HttpEntity<Compte> entity = new HttpEntity<>(compte, headers);

		// send PUT request to update compte
		this.restTemplate.put("http://Gestion/update_Compte/{id}", entity, compte.getIdCompte());
	}

	public void 	addTransfert(Transfert transfert) {
		HttpHeaders headers = new HttpHeaders();

		headers.setContentType(MediaType.APPLICATION_JSON);
		// set accept header
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));


		HttpEntity<Transfert> entity = new HttpEntity<>(transfert, headers);

		Transfert newTransfert=restTemplate.postForObject("http://Gestion/add_Transfert", entity, Transfert.class);
	}

	public void sendSMS(String num,String msg) {


		SMSController.sendMessages(num, msg);

	}
}
