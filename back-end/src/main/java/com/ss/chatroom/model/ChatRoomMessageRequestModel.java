package com.ss.chatroom.model;

import lombok.Data;

@Data
public class ChatRoomMessageRequestModel {
	private Long chatRoomId;
	private Long senderId;
	private String message;

}
