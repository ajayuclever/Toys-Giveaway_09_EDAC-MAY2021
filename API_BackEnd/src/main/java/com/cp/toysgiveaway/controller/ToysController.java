package com.cp.toysgiveaway.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cp.toysgiveaway.model.Toys;
import com.cp.toysgiveaway.model.User;
import com.cp.toysgiveaway.service.ToysService;
import com.cp.toysgiveaway.util.ImageEncoderDecoder;

@RestController
@RequestMapping("/toys")
public class ToysController {

	@Autowired
	private ToysService toysService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/addtoy")
	public ResponseEntity<Toys> addToy(
			@RequestParam("file") String file,
			@RequestParam("toyName") String toyName,
			@RequestParam("toyDescription") String toyDescription,
			@RequestParam("toyPrice") Long toyPrice,
			@RequestParam("quantity") int quantity,
			@RequestParam("availability") Boolean availability,
			@RequestParam("sellerId") Long sellerId) 
			throws IOException{
		Toys toy = new Toys();
		toy.setToyName(toyName);
		toy.setToyDescription(toyDescription);
		toy.setQuantity(quantity);
		toy.setToyPrice(toyPrice);
		toy.setAvailability(availability);
		toy.setSellerId(sellerId);
		toy.setToyImage(file);
//		toy.setToyImage(ImageEncoderDecoder.compressBytes(file.getBytes()));
//		toy.setImageName(file.getOriginalFilename());
		
		Toys toyRes = toysService.addToy(toy);
	
		if(toyRes!=null) {
//			toyRes.setToyImage(ImageEncoderDecoder.decompressBytes(toyRes.getToyImage()));
			return new ResponseEntity<Toys>(toyRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Toys>(HttpStatus.NO_CONTENT);
		}
	}
	
	
//	@PostMapping("/updatetoyImage")
//	public ResponseEntity<Toys> addToy(@RequestParam("file") MultipartFile file,@RequestParam("toyId") Long toyId) throws IOException{
//		Toys toyRes=new Toys();
//		if(file!=null)
//		{
//			Toys toy = toysService.getToy(toyId);
//			toy.setToyImage(new byte[file.getInputStream().available()]);
//			toy.setImageName(file.getOriginalFilename());
//			toyRes = toysService.addToy(toy);
//		}
//		if(toyRes!=null) {
//			return new ResponseEntity<Toys>(toyRes,HttpStatus.OK);
//		}
//		else {
//			return new ResponseEntity<Toys>(HttpStatus.NO_CONTENT);
//		}
//	}
//	
	
	@CrossOrigin(origins = "*")
	@PostMapping("/updatetoy")
	public ResponseEntity<Toys> updateToy(@RequestParam(name = "file", required = false) String file,
			@RequestParam("toyId") Long toyId,
			@RequestParam("toyName") String toyName,
			@RequestParam("toyDescription") String toyDescription,
			@RequestParam("toyPrice") Long toyPrice,
			@RequestParam("quantity") int quantity,
			@RequestParam("availability") Boolean availability,
			@RequestParam("sellerId") Long sellerId) throws IOException{
		Toys toy = new Toys();
		toy.setToyId(toyId);
		toy.setToyName(toyName);
		toy.setToyDescription(toyDescription);
		toy.setQuantity(quantity);
		toy.setToyPrice(toyPrice);
		toy.setAvailability(availability);
		toy.setSellerId(sellerId);
		
		toy.setToyImage(file);
//		toy.setToyImage(ImageEncoderDecoder.compressBytes(file.getBytes()));
//		toy.setImageName(file.getOriginalFilename());
		
		
		Toys toyRes = toysService.addToy(toy);
		if(toyRes!=null) {
			
//			toyRes.setToyImage(ImageEncoderDecoder.decompressBytes(toyRes.getToyImage()));
			
			return new ResponseEntity<Toys>(toyRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Toys>(HttpStatus.NO_CONTENT);
		}
	}
	
	
	@CrossOrigin(origins = "*")
	@PostMapping("/deletetoy")
	public ResponseEntity<Integer> deleteToy(@RequestBody Toys toy) {
		Integer deletedRecods = toysService.deleteToy(toy);
		if(deletedRecods!=null) {
			return new ResponseEntity<Integer>(deletedRecods,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Integer>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/gettoys")
	public ResponseEntity<List<Toys>> getToys() {
		List<Toys> toys = toysService.getToys();
		if(toys!=null) {
			return new ResponseEntity<List<Toys>>(toys,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<List<Toys>>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/gettoy/{toyId}")
	public ResponseEntity<Toys> getToy(@PathVariable("toyId") Long toyId) {
		Toys toy = toysService.getToy(toyId);
		if(toy!=null) {
			return new ResponseEntity<Toys>(toy,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Toys>(HttpStatus.NO_CONTENT);
		}
	}
}
