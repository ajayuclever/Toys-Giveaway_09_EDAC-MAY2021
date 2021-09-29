package com.cp.toysgiveaway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.toysgiveaway.model.Admin;
import com.cp.toysgiveaway.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;
	
	public Admin adminLogin(Admin admin) {
		try{
			return adminRepository.getAdmin(admin.getAdminId(),admin.getUsername(),admin.getPassword());
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Boolean changePassword(Admin admin) {
		Boolean res=false;
		try{
			if(adminRepository.changePassword(admin.getAdminId(),admin.getUsername(),admin.getPassword())>0) {
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
}
