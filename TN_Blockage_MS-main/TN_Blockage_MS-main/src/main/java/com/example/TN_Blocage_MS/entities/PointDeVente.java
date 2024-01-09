package com.example.TN_Blocage_MS.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;
@Entity
@Table(name="point_de_vente")
@Data @NoArgsConstructor @AllArgsConstructor
public class PointDeVente extends LieuDeTravail{
	

	@OneToMany(targetEntity=Agent.class,mappedBy="pointdevente")
	@JsonIgnoreProperties({"pointdevente"})
	private List<Agent> agents;
	private double montant_maximal;
}
