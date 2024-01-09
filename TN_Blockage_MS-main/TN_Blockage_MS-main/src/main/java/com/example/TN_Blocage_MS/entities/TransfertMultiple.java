package com.example.TN_Blocage_MS.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
@Entity
@Table(name="Transfert_Multiple")
@Data @NoArgsConstructor @AllArgsConstructor
public class TransfertMultiple {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@JsonProperty(access=Access.READ_ONLY)
	private Long id;
	@OneToMany(targetEntity=Transfert.class,mappedBy="transfertMultiple")
	@JsonIgnoreProperties({"transfertMultiple"})
	private List<Transfert> transferts;
	

}
