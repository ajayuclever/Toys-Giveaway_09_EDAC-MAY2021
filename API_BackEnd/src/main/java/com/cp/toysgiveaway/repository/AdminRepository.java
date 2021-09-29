package com.cp.toysgiveaway.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cp.toysgiveaway.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>{

	@Query(value="select * from toysdb.admin where admin_id=:adminId and username=:username and password=:password",nativeQuery=true)
	public Admin getAdmin(Long adminId,String username,String password);
	
	@Modifying
	@Transactional
	@Query(value="update toysdb.admin set password=:password where admin_id=:adminId and username=:username",nativeQuery=true)
	public Integer changePassword(Long adminId,String username,String password);
}
