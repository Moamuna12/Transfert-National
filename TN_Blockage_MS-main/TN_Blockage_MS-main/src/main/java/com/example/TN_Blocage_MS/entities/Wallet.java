package com.example.TN_Blocage_MS.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
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
