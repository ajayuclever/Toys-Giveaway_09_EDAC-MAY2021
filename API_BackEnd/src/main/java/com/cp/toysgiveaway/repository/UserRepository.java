package com.cp.toysgiveaway.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cp.toysgiveaway.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	@Query(value="select * from toysdb.user where email=:email and password=:password and user_type=:userType",nativeQuery=true)
	public User userLogin(String email,String password,String userType);
	
	@Query(value="select * from toysdb.user where user_id=:userId",nativeQuery=true)
	public User getUser(Long userId);
	
	@Query(value="select * from toysdb.user",nativeQuery=true)
	public List<User> getUsers();

	@Query(value="select * from toysdb.user where user_type=:userType",nativeQuery=true)
	public List<User> getSellerOrBuyer(String userType);
	
	@Modifying
	@Transactional
	@Query(value="update toysdb.user set password=:password where user_id=:userId",nativeQuery=true)
	public Integer changePassword(String password,Long userId);	
}
