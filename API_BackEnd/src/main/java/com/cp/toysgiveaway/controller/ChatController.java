package com.cp.toysgiveaway.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.cp.toysgiveaway.model.Chat;
import com.cp.toysgiveaway.service.ChatService;

@RestController
@RequestMapping("/chat")
public class ChatController {

	@Autowired
	private ChatService chatService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/addchat")
	public ResponseEntity<Chat> addChat(@RequestBody Chat chat) {
		Chat chatRes = chatService.addChat(chat);
		if(chatRes!=null) {
			return new ResponseEntity<Chat>(chatRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Chat>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/getchats/{sellerId}/{buyerId}")
	public ResponseEntity<List<Chat>> getChats(@PathVariable("sellerId") String sellerId,@PathVariable("buyerId") String buyerId){
		List<Chat> chats = chatService.getChats(sellerId,buyerId);
		if(chats!=null) {
			return new ResponseEntity<List<Chat>>(chats,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<List<Chat>>(HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/getuserchat/{userId}")
	public ResponseEntity<List<Chat>> getUserChat(@PathVariable("userId") Long userId){
		List<Chat> chats = chatService.getUserChat(userId);
		if(chats!=null) {
			
			return new ResponseEntity<List<Chat>>(chats,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<List<Chat>>(HttpStatus.NO_CONTENT);
		}
	}
	
}