package com.cp.toysgiveaway.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cp.toysgiveaway.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long>{

	@Query(value="select * from toysdb.chat where (from_user=:sellerId and to_user=:buyerId) OR (from_user=:buyerId and to_user=:sellerId)",nativeQuery = true)
	public List<Chat> getChats(String sellerId,String buyerId);
	
	@Query(value="SELECT * FROM toysdb.chat WHERE from_user=:userId OR to_user=:userId",nativeQuery = true)
	public List<Chat> getUserChat(Long userId);
}
