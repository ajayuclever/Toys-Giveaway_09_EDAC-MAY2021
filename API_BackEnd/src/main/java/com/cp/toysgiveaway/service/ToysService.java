package com.cp.toysgiveaway.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.toysgiveaway.model.Toys;
import com.cp.toysgiveaway.repository.ToysRepository;

@Service
public class ToysService {

	@Autowired
	private ToysRepository toysRepository;
	
	public Toys addToy(Toys toy) {
		try {
			return toysRepository.save(toy);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Toys getToy(Long toyId) {
		try {
			return toysRepository.getToy(toyId);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Boolean updateToy(Toys toy) {
		try {
			if(toysRepository.updateToy(toy.getToyId(), toy.getToyName(), toy.getToyDescription(), toy.getToyPrice(), toy.getQuantity(), toy.getAvailability(), toy.getSellerId())>0) {
				return true;
			}
			else {
				return false;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	
	public Integer deleteToy(Toys toy) {
		try {
			return toysRepository.deleteToy(toy.getToyId(), toy.getSellerId());
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	
	public List<Toys> getToys() {
		try {
			List<Toys> toys = toysRepository.getToys();
			if(toys!=null) {
				return toys;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
