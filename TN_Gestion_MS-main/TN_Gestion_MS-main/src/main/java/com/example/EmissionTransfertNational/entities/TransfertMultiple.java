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
