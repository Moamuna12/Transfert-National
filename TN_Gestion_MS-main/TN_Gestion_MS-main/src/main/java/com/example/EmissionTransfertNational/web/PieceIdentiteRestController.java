package com.example.EmissionTransfertNational.web;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.EmissionTransfertNational.entities.*;
import com.example.EmissionTransfertNational.repositories.*;
@RestController @CrossOrigin("*")
public class PieceIdentiteRestController {
	private PieceIdentiteRepository pieceIdentiteR;
	private ClientRepository clientR;
	public PieceIdentiteRestController(PieceIdentiteRepository pieceRepository,ClientRepository clientR){
			this.pieceIdentiteR=pieceRepository;
			this.clientR=clientR;
	}
	@GetMapping(path="/get_PieceIdentites")
	public List<PieceIdentite>listPieceIdentites(){
		return pieceIdentiteR.findAll();
		
	}
	@GetMapping(path="/get_PieceIdentite/{id}")
	public PieceIdentite getPieceIdentite(@PathVariable Long id){
		return pieceIdentiteR.findById(id).get();
		
	}
	@PostMapping(path="/add_PieceIdentite")
	public PieceIdentite savePieceIdentite(@RequestBody PieceIdentite PieceIdentite){
		
		return pieceIdentiteR.save(PieceIdentite);
		
	}
	@PutMapping(path="/update_PieceIdentite/{id}")
	public PieceIdentite updatePieceIdentite(@PathVariable Long id,@RequestBody PieceIdentite nvPieceIdentite){
		nvPieceIdentite.setId(id);
		
		return pieceIdentiteR.save(nvPieceIdentite);
		
	}
	@DeleteMapping(path="/delete_PieceIdentite/{id}")
	public void deletePieceIdentite(@PathVariable Long id){
		pieceIdentiteR.deleteById(id);
		
	}
}
