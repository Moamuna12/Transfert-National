package com.example.EmissionTransfertNational.entities;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name="point_de_vente")
@Data @NoArgsConstructor @AllArgsConstructor
public class PointDeVente extends LieuDeTravail{
	
	@OneToMany(targetEntity=Agent.class,mappedBy="pointdevente")
	@JsonIgnoreProperties({"pointdevente"})
	private List<Agent> agents;
	private double montant_maximal;
}
