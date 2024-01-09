package com.example.EmissionTransfertNational.entities;

import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name="Carte_de_credit")
@Data @NoArgsConstructor @AllArgsConstructor
public class CarteDeCredit {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@JsonProperty(access=Access.READ_ONLY)
	private Long id;
	@ManyToOne
	@JoinColumn(name="wallet_id")
	@JsonIgnoreProperties({"cartes"})
	private Wallet wallet;
	private double montant;
	private Date date_expiration;
}
