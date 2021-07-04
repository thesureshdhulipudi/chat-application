package com.ss.chatroom.model;

import java.util.Date;
import java.util.List;

import com.ss.chatroom.entities.MessageStatusEnum;

import lombok.Data;

@Data
public class ChatMessagesResponseModel {

	private String chatId;
	private UserModle senderUser;
	private UserModle reciverUser;
	private Long senderUserId;
	private Long reciverUserId;
	private List<ChatMessages> chatMessages;
	private Date createdTimestamp;

	@Data
	public class ChatMessages {
		private String message;
		private Long msgId;
		private MessageStatusEnum messageStatus;
		private Date messageTimestamp;
		private Long senderUserId;
		private Long reciverUserId;
	}
	
	

}
