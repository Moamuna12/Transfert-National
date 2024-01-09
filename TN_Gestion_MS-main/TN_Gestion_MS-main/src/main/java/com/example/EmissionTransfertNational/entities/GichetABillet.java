package com.example.EmissionTransfertNational.entities;


import javax.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Gichet_a_billet")
@Data @NoArgsConstructor @AllArgsConstructor
public class GichetABillet extends LieuDeTravail{
	private double montant_disponible;
	
}
