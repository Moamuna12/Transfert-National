package com.example.EmissionTransfertNational.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmissionTransfertNational.entities.*;

public interface CompteRepository extends JpaRepository<Compte, Long> {
	List<Compte> findByClient(Client clientID);
}
