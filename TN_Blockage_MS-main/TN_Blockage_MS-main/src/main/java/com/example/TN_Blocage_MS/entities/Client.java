package com.example.TN_Blocage_MS.entities;


import com.example.TN_Blocage_MS.enums.Sexe;
import com.example.TN_Blocage_MS.enums.TypeClient;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name="Client")
@Data @NoArgsConstructor @AllArgsConstructor
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
	@OneToMany( targetEntity=Compte.class, mappedBy="client")
	@JsonIgnoreProperties({"client"})
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
	public long getIdClient() {
		return idClient;
	}
	public void setIdClient(long idClient) {
		this.idClient = idClient;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public PieceIdentite getPiece_identite() {
		return piece_identite;
	}
	public void setPiece_identite(PieceIdentite piece_identite) {
		this.piece_identite = piece_identite;
	}
	public List<Compte> getComptes() {
		return comptes;
	}
	public void setComptes(List<Compte> comptes) {
		this.comptes = comptes;
	}
	public TypeClient getType() {
		return type;
	}
	public void setType(TypeClient type) {
		this.type = type;
	}
	public Sexe getSexe() {
		return sexe;
	}
	public void setSexe(Sexe sexe) {
		this.sexe = sexe;
	}
	public String getProfession() {
		return profession;
	}
	public void setProfession(String profession) {
		this.profession = profession;
	}
	public String getPays_d_adresse() {
		return pays_d_adresse;
	}
	public void setPays_d_adresse(String pays_d_adresse) {
		this.pays_d_adresse = pays_d_adresse;
	}
	public String getAdresselegale() {
		return adresselegale;
	}
	public void setAdresselegale(String adresselegale) {
		this.adresselegale = adresselegale;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Wallet getWallet() {
		return wallet;
	}
	public void setWallet(Wallet wallet) {
		this.wallet = wallet;
	}
	public String getVille() {
		return ville;
	}
	public void setVille(String ville) {
		this.ville = ville;
	}
	
	
}
