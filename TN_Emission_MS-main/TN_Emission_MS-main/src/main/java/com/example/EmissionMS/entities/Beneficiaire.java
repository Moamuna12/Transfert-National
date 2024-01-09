package com.example.EmissionMS.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="Beneficiaire")
@Data @NoArgsConstructor 
public class Beneficiaire extends Client {
	@Column(name="idBeneficiaire")
	private long idClient;
	private int nbr_transfert_recus;
	@JsonIgnoreProperties({"beneficiaire"})
	@OneToMany( targetEntity=Transfert.class, mappedBy="emetteur")
	@Transient
	private List <Transfert> transferts;
	@JsonIgnoreProperties({"beneficiaires","transfert"})
	@ManyToMany
	@JoinTable(name="Emetteur_Beneficiaire",joinColumns=@JoinColumn(name="idBeneficiaire"),inverseJoinColumns=@JoinColumn(name="idEmetteur"))
	private List<Emetteur> emetteurs;

}
