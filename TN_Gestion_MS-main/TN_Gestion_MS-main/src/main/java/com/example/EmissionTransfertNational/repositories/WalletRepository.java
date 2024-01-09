package com.example.EmissionTransfertNational.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmissionTransfertNational.entities.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
	
}
