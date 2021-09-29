package com.cp.toysgiveaway.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cp.toysgiveaway.model.Toys;

@Repository
public interface ToysRepository extends JpaRepository<Toys, Long>{

	@Modifying
	@Transactional
	@Query(value="update toysdb.toys set toy_name=:toyName, toy_description=:toyDescription, toy_price=:toyPrice, quantity=:quantity, availability=:availability, seller_id=:sellerId where toy_id=:toyId",nativeQuery=true)
	public Integer updateToy(Long toyId,String toyName,String toyDescription,Long toyPrice,int quantity,Boolean availability,Long sellerId);
	
	@Modifying
	@Transactional
	@Query(value="delete from toysdb.toys where seller_id=:sellerId and toy_id=:toyId",nativeQuery=true)
	public Integer deleteToy(Long toyId,Long sellerId);
	
	@Query(value="select * from toysdb.toys where toy_id=:toyId",nativeQuery=true)
	public Toys getToy(Long toyId);	
	
	@Query(value="select * from toysdb.toys",nativeQuery=true)
	public List<Toys> getToys();	
	
}
