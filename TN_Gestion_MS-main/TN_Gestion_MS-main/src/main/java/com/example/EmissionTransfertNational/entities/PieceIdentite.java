package com.example.EmissionTransfertNational.entities;

import java.util.Date;

import javax.persistence.*;


import com.example.EmissionTransfertNational.enums.TypePieceIdentite;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.*;
@Entity
@Table(name="Piece_Identite")
@Data @NoArgsConstructor @AllArgsConstructor @Getter @Setter
public class PieceIdentite {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	//@JsonProperty(access=Access.READ_ONLY)
	private long id;
	@Enumerated(EnumType.STRING)
	private TypePieceIdentite type_piece_identite;
	private String numero;
	private Date date_de_naissance;
	private String pays;
	 @OneToOne(mappedBy = "piece_identite")
	 @JsonIgnoreProperties({"piece_identite"})
	private Client client;
	private Date date_d_expiration;
}
