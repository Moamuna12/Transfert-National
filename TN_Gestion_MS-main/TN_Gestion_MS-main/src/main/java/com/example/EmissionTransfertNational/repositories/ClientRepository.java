package com.example.EmissionTransfertNational.repositories;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.EmissionTransfertNational.entities.Client;

import java.util.List;

@CrossOrigin("*")
public interface ClientRepository extends JpaRepository<Client,Long> {

	@Query("SELECT c FROM Client c WHERE TYPE(c) = com.example.EmissionTransfertNational.entities.Client")
	List<Client> findAllClientsOnly();
	@Query("select c from Client c where c.idClient=:idclient")
	Client findWithIdClient(@Param("idclient")long id);
	
	Client findByIdClient(long id);

	Client findByUsernameAndPassword(String username, String password);

	Client findByUsername(String username);

	Client findByEmail(String email);

	Client findByEmailAndPassword(String email, String password);
}
