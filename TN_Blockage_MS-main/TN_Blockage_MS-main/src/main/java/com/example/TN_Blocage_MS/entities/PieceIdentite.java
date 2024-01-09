package com.example.TN_Blocage_MS.entities;


import com.example.TN_Blocage_MS.enums.TypePieceIdentite;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
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
