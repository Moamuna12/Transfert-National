package com.example.EmissionTransfertNational.entities;


import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.example.EmissionTransfertNational.enums.TypeCompte;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Emetteur")
@NoArgsConstructor @AllArgsConstructor @Getter @Setter
@EqualsAndHashCode(callSuper = true)
public @Data class Emetteur extends Client {
	@Column(name="idEmetteur")
	private long idClient;
	private double limite_somme_transfert;
	private int nbr_transfert_envoyes;
	@OneToMany( targetEntity=Transfert.class, mappedBy="emetteur")
	@Transient
	private List<Transfert> transferts;
	
	@JsonIgnoreProperties(value={"emetteur","transfert"},allowSetters = true)
	@ManyToMany(  cascade = {
        CascadeType.MERGE, 
    })
	@JoinTable(name="Emetteur_Beneficiaire",joinColumns=@JoinColumn(name="idEmetteur"),inverseJoinColumns=@JoinColumn(name="idBeneficiaire"))
	private List<Beneficiaire>beneficiaires;
	@Override
	public String toString() {
		return "Emetteur [idClient=" + idClient + "]";
	}
	
	
}