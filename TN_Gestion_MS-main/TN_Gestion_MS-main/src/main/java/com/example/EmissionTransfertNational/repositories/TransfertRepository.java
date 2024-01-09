package com.example.EmissionTransfertNational.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmissionTransfertNational.entities.Transfert;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmissionTransfertNational.entities.*;

public interface TransfertRepository extends JpaRepository<Transfert, Long> {


	List<Transfert> findByEmetteur_idClient(long i);

}
