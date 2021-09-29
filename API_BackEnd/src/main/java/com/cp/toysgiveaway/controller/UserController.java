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

import com.cp.toysgiveaway.model.User;
import com.cp.toysgiveaway.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/adduser")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		User userRes = userService.addUser(user);
		if(userRes!=null) {
			return new ResponseEntity<User>(userRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/userlogin")
	public ResponseEntity<User> userLogin(@RequestBody User user) {
		User userRes = userService.userLogin(user);
		if(userRes!=null) {
			return new ResponseEntity<User>(userRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		}
	}
	
	
	@CrossOrigin(origins = "*")
	@GetMapping("/getuser/{userId}")
	public ResponseEntity<User> getUser(@PathVariable("userId") Long userId) {
		User userRes = userService.getUser(userId);
		if(userRes!=null) {
			return new ResponseEntity<User>(userRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/changepassword")
	public ResponseEntity<User> changePassword(@RequestBody User user) {
		if(userService.changePassword(user)) {
			return new ResponseEntity<User>(user,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		}
	}
	
	
	@GetMapping("/getusers")
	public ResponseEntity<List<User>> getusers() {
		List<User> users = userService.getUsers();
		if(users!=null) {
			return new ResponseEntity<List<User>>(users,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/getuserbyusertype/{userType}")
	public ResponseEntity<List<User>> getuserByUserType(@PathVariable("userType") String userType) {
		List<User> users = userService.getBuyerOrSeller(userType);
		if(users!=null) {
			return new ResponseEntity<List<User>>(users,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/updateuser")
	public ResponseEntity<User> updateUser(
			@RequestBody User user)
			throws IOException{

		User userRes = userService.addUser(user);
		if(userRes!=null) {
			return new ResponseEntity<User>(userRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		}
	}
	
}
