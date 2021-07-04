package com.ss.chatroom.model;

import lombok.Data;

@Data
public class MessageTypingModel {
	private String chatType;
	private Long senderId;
	private String id;
	private Long receiverId;
}
