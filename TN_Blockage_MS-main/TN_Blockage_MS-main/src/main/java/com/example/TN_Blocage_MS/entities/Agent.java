package com.example.TN_Blocage_MS.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;



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
	@JsonIgnore
	private List<Transfert> transferts;
	public double getSalary() {
		return salary;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}
	public PointDeVente getPointdevente() {
		return pointdevente;
	}
	public void setPointdevente(PointDeVente pointdevente) {
		this.pointdevente = pointdevente;
	}
	public List<Transfert> getTransferts() {
		return transferts;
	}
	public void setTransferts(List<Transfert> transferts) {
		this.transferts = transferts;
	}
	
}
