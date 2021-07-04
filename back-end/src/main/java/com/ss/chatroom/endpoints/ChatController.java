package com.ss.chatroom.endpoints;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss.chatroom.exception.DuplicateRecordFoundException;
import com.ss.chatroom.exception.MessageSentFailedException;
import com.ss.chatroom.model.ChatMessageModel;
import com.ss.chatroom.model.ChatMessagesResponseModel;
import com.ss.chatroom.model.ChatNotificationModel;
import com.ss.chatroom.model.ChatRoomMessageRequestModel;
import com.ss.chatroom.model.ChatRoomRequestModel;
import com.ss.chatroom.model.ChatRoomResponseModel;
import com.ss.chatroom.model.MessageTypingModel;
import com.ss.chatroom.model.ResponseModel;
import com.ss.chatroom.services.ChatService;
import com.ss.chatroom.utils.ChatRoomConstants;
import com.ss.chatroom.utils.ResponseBuilderUtility;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

	private final ChatService chatService;

	@MessageMapping
	public ResponseEntity<ResponseModel> processMessage(@Payload ChatMessageModel chatMessageModel) throws MessageSentFailedException {
		List<ChatMessagesResponseModel> msg = chatService.sendMessage(chatMessageModel);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, msg, "Successfully message sent.");
	}
	
	@PostMapping
	public ResponseEntity<ResponseModel> sendMessage(@RequestBody ChatMessageModel chatMessageModel) throws MessageSentFailedException {
		List<ChatMessagesResponseModel> msg = chatService.sendMessage(chatMessageModel);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, msg, "Successfully message sent.");
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<ResponseModel> getAllChats(@PathVariable(required = false) Long userId){
		List<ChatMessagesResponseModel> msgs = chatService.getAllChatMessages(userId);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, msgs, "Successfully Chat messages retrived");
	}
	
	@PostMapping("/createChatRoom")
	public ResponseEntity<ResponseModel> createChatRoom(@RequestBody ChatRoomRequestModel chatRoomRequestModel) throws DuplicateRecordFoundException{
		List<ChatRoomResponseModel> msgs = chatService.createChatRoom(chatRoomRequestModel);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, msgs, "Successfully Chat group created");
	}
	
	@GetMapping("/fetchChatRooms/{userId}")
	public ResponseEntity<ResponseModel> createChatRoom(@PathVariable(required = false) Long userId){
		List<ChatRoomResponseModel> msgs = chatService.fetchChatRooms(userId);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, msgs, "Successfully retrived Chat groups");
	}
	
	@PostMapping("/sendChatRoomMessage")
	public ResponseEntity<ResponseModel> sendChatRoomMessage(@RequestBody ChatRoomMessageRequestModel chatRoomMessageRequestModel){
		List<ChatRoomResponseModel> msgs = chatService.sendChatRoomMessage(chatRoomMessageRequestModel);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, msgs, "Successfully message sent to Chat group");
	}
	
	@PostMapping("/sendTypingMessage")
	public ResponseEntity<ResponseModel> sendTypingMessage(@RequestBody MessageTypingModel messageTypingModel){
		ChatNotificationModel msgs = chatService.sendTypingMessage(messageTypingModel);
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.SUCCESS, msgs, "Successfully typing message sent");
	}

}
