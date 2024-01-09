package com.example.EmissionTransfertNational.entities;

import java.util.List;

import javax.persistence.*;

import com.example.EmissionTransfertNational.enums.Sexe;
import com.example.EmissionTransfertNational.enums.TypeClient;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.*;
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name="Client")
@Data @NoArgsConstructor @AllArgsConstructor @Setter @Getter
public class Client {
	@Id @GeneratedValue
	//@JsonProperty(access=Access.READ_ONLY)
	private long idClient;
	private String nom;
	private String prenom;
	private String telephone;
	private String username;
	private String password;
	private String role;
	@OneToOne
    @JoinColumn(name = "piece_id", referencedColumnName = "id")
	@JsonIgnoreProperties({"client"})
	private PieceIdentite piece_identite;
	@OneToMany(targetEntity=Compte.class, mappedBy="client")
	private List<Compte> comptes;
	@Enumerated(EnumType.STRING)
	private TypeClient type;
	@Enumerated(EnumType.STRING)
	private Sexe sexe;
	private String profession;
	private String pays_d_adresse;
	private String adresselegale;
	private String email;
	@OneToOne
	@JoinColumn(name = "wallet_id", referencedColumnName = "id")
	@JsonIgnoreProperties({"client"})
	private Wallet wallet;
	private String ville;
}
