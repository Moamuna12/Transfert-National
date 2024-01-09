package com.example.EmissionTransfertNational.entities;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name="LieuDeTravail")
@Data @NoArgsConstructor @AllArgsConstructor
public class LieuDeTravail {
	@Id @GeneratedValue
	private long id;
	private int numero_de_ville;
	private String ville;
	private String pays;
	@OneToMany( targetEntity=Transfert.class, mappedBy="lieuDeDemande")
	@JsonIgnoreProperties({"lieuDeService","lieuDeDemande","agent"})
	@JsonProperty(access=Access.READ_ONLY)
	private List<Transfert> transfert_demandes;
	@OneToMany( targetEntity=Transfert.class, mappedBy="lieuDeService")
	@JsonIgnoreProperties({"lieuDeService","lieuDeService","agent"})
	@JsonProperty(access=Access.READ_ONLY)
	private List<Transfert> transfert_servis;
}
