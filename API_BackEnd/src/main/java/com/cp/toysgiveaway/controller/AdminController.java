package com.cp.toysgiveaway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cp.toysgiveaway.model.Admin;
import com.cp.toysgiveaway.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/login")
	public ResponseEntity<Admin> login(@RequestBody Admin admin) {
		Admin adminRes = adminService.adminLogin(admin);
		if(adminRes!=null) {
			return new ResponseEntity<Admin>(adminRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Admin>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/changepassword")
	public ResponseEntity<Admin> changePassword(@RequestBody Admin admin) {
		if(adminService.changePassword(admin)) {
			return new ResponseEntity<Admin>(admin,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Admin>(HttpStatus.NO_CONTENT);
		}
	}
}
