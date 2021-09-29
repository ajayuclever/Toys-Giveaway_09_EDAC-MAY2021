package com.cp.toysgiveaway.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.toysgiveaway.model.Chat;
import com.cp.toysgiveaway.repository.ChatRepository;

@Service
public class ChatService {

	@Autowired
	private ChatRepository chatRepository;
	
	public Chat addChat(Chat chat) {
		try {
			return chatRepository.save(chat);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Chat> getChats(String sellerId,String buyerId){
		List<Chat> chats=new ArrayList<Chat>();
		try {
			chats = chatRepository.getChats(sellerId, buyerId);
			if(chats!=null) {
				return chats;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public List<Chat> getUserChat(Long userId){
		List<Chat> chats=new ArrayList<Chat>();
		try {
			chats = chatRepository.getUserChat(userId);
			
			if(chats!=null) {
				return chats;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
