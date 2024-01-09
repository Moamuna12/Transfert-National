package com.example.EmissionMS.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="Gichet_a_billet")
@Data @NoArgsConstructor @AllArgsConstructor
public class GichetABillet extends LieuDeTravail{
	private double montant_disponible;
	
}
