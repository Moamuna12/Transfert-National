package com.example.TN_Blocage_MS.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Emetteur")
@Data @NoArgsConstructor @AllArgsConstructor
public class Emetteur extends Client {
	@Column(name="idEmetteur")
	private long idClient;
	private double limite_somme_transfert;
	private int nbr_transfert_envoyes;
	@OneToMany( targetEntity=Transfert.class, mappedBy="emetteur")
	@Transient
	private List<Transfert> transferts;
	@JsonIgnoreProperties(value={"emetteur","transfert"},allowSetters=true)
	@ManyToMany
	@JoinTable(name="Emetteur_Beneficiaire",joinColumns=@JoinColumn(name="idEmetteur"),inverseJoinColumns=@JoinColumn(name="idBeneficiaire"))
	private List<Beneficiaire>beneficiaires;
	public long getIdClient() {
		return idClient;
	}
	public void setIdClient(long idClient) {
		this.idClient = idClient;
	}
	public double getLimite_somme_transfert() {
		return limite_somme_transfert;
	}
	public void setLimite_somme_transfert(double limite_somme_transfert) {
		this.limite_somme_transfert = limite_somme_transfert;
	}
	public int getNbr_transfert_envoyes() {
		return nbr_transfert_envoyes;
	}
	public void setNbr_transfert_envoyes(int nbr_transfert_envoyes) {
		this.nbr_transfert_envoyes = nbr_transfert_envoyes;
	}
	public List<Transfert> getTransferts() {
		return transferts;
	}
	public void setTransferts(List<Transfert> transferts) {
		this.transferts = transferts;
	}
	public List<Beneficiaire> getBeneficiaires() {
		return beneficiaires;
	}
	public void setBeneficiaires(List<Beneficiaire> beneficiaires) {
		this.beneficiaires = beneficiaires;
	}
	
}
