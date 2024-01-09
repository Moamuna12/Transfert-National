package com.example.EmissionMS.entities;


import com.example.EmissionMS.enums.TypeCompte;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name="Compte")
@Data @NoArgsConstructor @AllArgsConstructor @Getter @Setter
public class Compte {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private long idCompte;
	private double montant;
	@ManyToOne
	@JoinColumn(name="idClient")
	private Client client;
	private Date date_ouverture;
	@Enumerated(EnumType.STRING)
	private TypeCompte type;
	public long getIdCompte() {
		return idCompte;
	}
	public void setIdCompte(long idCompte) {
		this.idCompte = idCompte;
	}
	public double getMontant() {
		return montant;
	}
	public void setMontant(double montant) {
		this.montant = montant;
	}
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public Date getDate_ouverture() {
		return date_ouverture;
	}
	public void setDate_ouverture(Date date_ouverture) {
		this.date_ouverture = date_ouverture;
	}
	public TypeCompte getType() {
		return type;
	}
	public void setType(TypeCompte type) {
		this.type = type;
	}
	
}
