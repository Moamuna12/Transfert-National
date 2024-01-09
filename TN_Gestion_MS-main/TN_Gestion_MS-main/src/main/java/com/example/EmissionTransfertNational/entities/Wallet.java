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
@Table(name="Wallet")
@Data @NoArgsConstructor @AllArgsConstructor
public class Wallet {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	//@JsonProperty(access=Access.READ_ONLY)
	private Long id;
	@OneToOne(mappedBy="wallet")
	@JsonIgnoreProperties({"wallet"})  //ignorer a la lecture
	private Client client;
	@JsonIgnoreProperties({"wallet"})    //ignorer a la lecture
	@OneToMany(targetEntity=CarteDeCredit.class,mappedBy="wallet")
	private List<CarteDeCredit> cartes;
}
