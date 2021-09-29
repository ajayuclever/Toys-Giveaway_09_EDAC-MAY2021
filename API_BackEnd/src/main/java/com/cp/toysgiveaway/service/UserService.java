package com.cp.toysgiveaway.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.toysgiveaway.model.User;
import com.cp.toysgiveaway.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public User addUser(User user) {
		try {
			return userRepository.save(user);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public User userLogin(User user) {
		try {
			return userRepository.userLogin(user.getEmail(), user.getPassword(), user.getUserType());
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public User getUser(Long userId) {
		try {
			return userRepository.getUser(userId);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public Boolean changePassword(User user) {
		Boolean res=false;
		try{
			if(userRepository.changePassword(user.getPassword(),user.getUserId())>0) {
				res=true;
			}
			else {
				res=false;
			}
		}
		catch(Exception e) {
			res=false;
			e.printStackTrace();
		}
		return res;
	}
	
	
	public List<User> getUsers() {
		try {
			List<User> users = userRepository.getUsers();
			if(users!=null) {
				return users;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<User> getBuyerOrSeller(String userType) {
		try {
			List<User> users = userRepository.getSellerOrBuyer(userType);
			if(users!=null) {
				return users;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
