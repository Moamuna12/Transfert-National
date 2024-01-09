package com.example.EmissionTransfertNational.entities;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Agent")
@Data @NoArgsConstructor 
public class Agent extends Client {
	private double salary;
	@ManyToOne
	@JoinColumn(name="point_de_vente_id")
	@JsonIgnoreProperties({"agents"})
	private PointDeVente pointdevente;
	@JsonIgnoreProperties({"agent"})
	@OneToMany(targetEntity=Transfert.class,mappedBy = "agent")
	private List<Transfert> transferts;
}
