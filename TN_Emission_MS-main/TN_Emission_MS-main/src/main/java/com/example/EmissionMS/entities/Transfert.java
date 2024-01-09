package com.example.EmissionMS.entities;


import com.example.EmissionMS.enums.EtatTransfert;
import com.example.EmissionMS.enums.MotifTransfert;
import com.example.EmissionMS.enums.TypeFrais;
import com.example.EmissionMS.enums.TypeTransfert;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name="Transfert")
@Data @NoArgsConstructor @AllArgsConstructor
public class Transfert {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private long id;
	private String reference;
	private String codePin;
	@Enumerated(EnumType.STRING)
	private TypeTransfert type;
	@Enumerated(EnumType.STRING)
	private EtatTransfert etat;
	private Date delai_de_validite;
	private Date delai_de_desherence;
	private Date date_demission;
	private Date date_de_blocage;
	private Date date_de_deblocage;
	private double montant_transfert;
	private double montant_operation;
	private double comission;
	private TypeFrais frais;
	@ManyToOne
	@JoinColumn(name="emetteur_id")
	@JsonIgnoreProperties({"transfert"})
	private Emetteur emetteur;
	@ManyToOne
	@JoinColumn(name="agent_id")
	@JsonIgnoreProperties({"transfert","pointdevente"})
	private Agent agent;
	private String pays_d_emission;
	@ManyToOne
	@JoinColumn(name="beneficiaire_id")
	@JsonIgnoreProperties({"transfert"})
	private Beneficiaire beneficiaire;
	@Enumerated(EnumType.STRING)
	private MotifTransfert motif;
	@ManyToOne
	@JoinColumn(name="transfert_multiple_id")
	@JsonIgnoreProperties({"transferts"})
	private TransfertMultiple transfertMultiple;
	@ManyToOne
	@JoinColumn(name="lieuDeService")
	@JsonIgnoreProperties({"transfert_demandes","transfert_servis","agents"})
	private LieuDeTravail lieuDeService;
	@ManyToOne
	@JoinColumn(name="lieuDeDemande")
	@JsonIgnoreProperties({"transfert_demandes","transfert_servis","agents"})
	private LieuDeTravail lieuDeDemande;
	private boolean notification=false;
	private String motifRestitution;
	private String motifblocage;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getReference() {
		return reference;
	}
	public void setReference(String reference) {
		this.reference = reference;
	}
	public String getCodePin() {
		return codePin;
	}
	public void setCodePin(String codePin) {
		this.codePin = codePin;
	}
	public TypeTransfert getType() {
		return type;
	}
	public void setType(TypeTransfert type) {
		this.type = type;
	}
	public EtatTransfert getEtat() {
		return etat;
	}
	public void setEtat(EtatTransfert etat) {
		this.etat = etat;
	}
	public Date getDelai_de_validite() {
		return delai_de_validite;
	}
	public void setDelai_de_validite(Date delai_de_validite) {
		this.delai_de_validite = delai_de_validite;
	}
	public Date getDelai_de_desherence() {
		return delai_de_desherence;
	}
	public void setDelai_de_desherence(Date delai_de_desherence) {
		this.delai_de_desherence = delai_de_desherence;
	}
	public Date getDate_demission() {
		return date_demission;
	}
	public void setDate_demission(Date date_demission) {
		this.date_demission = date_demission;
	}
	public Date getDate_de_blocage() {
		return date_de_blocage;
	}
	public void setDate_de_blocage(Date date_de_blocage) {
		this.date_de_blocage = date_de_blocage;
	}
	public Date getDate_de_deblocage() {
		return date_de_deblocage;
	}
	public void setDate_de_deblocage(Date date_de_deblocage) {
		this.date_de_deblocage = date_de_deblocage;
	}
	public double getMontant_transfert() {
		return montant_transfert;
	}
	public void setMontant_transfert(double montant_transfert) {
		this.montant_transfert = montant_transfert;
	}
	public double getMontant_operation() {
		return montant_operation;
	}
	public void setMontant_operation(double montant_operation) {
		this.montant_operation = montant_operation;
	}
	public double getComission() {
		return comission;
	}
	public void setComission(double comission) {
		this.comission = comission;
	}
	public TypeFrais getFrais() {
		return frais;
	}
	public void setFrais(TypeFrais frais) {
		this.frais = frais;
	}
	public Emetteur getEmetteur() {
		return emetteur;
	}
	public void setEmetteur(Emetteur emetteur) {
		this.emetteur = emetteur;
	}
	public Agent getAgent() {
		return agent;
	}
	public void setAgent(Agent agent) {
		this.agent = agent;
	}
	public String getPays_d_emission() {
		return pays_d_emission;
	}
	public void setPays_d_emission(String pays_d_emission) {
		this.pays_d_emission = pays_d_emission;
	}
	public Beneficiaire getBeneficiaire() {
		return beneficiaire;
	}
	public void setBeneficiaire(Beneficiaire beneficiaire) {
		this.beneficiaire = beneficiaire;
	}
	public MotifTransfert getMotif() {
		return motif;
	}
	public void setMotif(MotifTransfert motif) {
		this.motif = motif;
	}
	public TransfertMultiple getTransfertMultiple() {
		return transfertMultiple;
	}
	public void setTransfertMultiple(TransfertMultiple transfertMultiple) {
		this.transfertMultiple = transfertMultiple;
	}
	public LieuDeTravail getLieuDeService() {
		return lieuDeService;
	}
	public void setLieuDeService(LieuDeTravail lieuDeService) {
		this.lieuDeService = lieuDeService;
	}
	public LieuDeTravail getLieuDeDemande() {
		return lieuDeDemande;
	}
	public void setLieuDeDemande(LieuDeTravail lieuDeDemande) {
		this.lieuDeDemande = lieuDeDemande;
	}
	public boolean isNotification() {
		return notification;
	}
	public void setNotification(boolean notification) {
		this.notification = notification;
	}
	public String getMotifRestitution() {
		return motifRestitution;
	}
	public void setMotifRestitution(String motifRestitution) {
		this.motifRestitution = motifRestitution;
	}
	public String getMotifblocage() {
		return motifblocage;
	}
	public void setMotifblocage(String motifblocage) {
		this.motifblocage = motifblocage;
	}
	
	
	
}
