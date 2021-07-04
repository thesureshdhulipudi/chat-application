package com.ss.chatroom.model;

import java.util.Date;
import java.util.List;

import com.ss.chatroom.entities.MessageStatusEnum;

import lombok.Data;

@Data
public class ChatRoomResponseModel {

	private Long chatRoomId;
	private String chatRoomName;
	private String chatRoomDescription;
	private UserModle createdBy;
	private List<UserModle> chatRoomMembers;
	private List<ChatMessages> chatMessages;
	private String avatarUrl;
	private Date createdTimestamp;

	@Data
	public class ChatMessages {
		private Long id;
		private String message;
		private UserModle senderUser;
		private List<ChatRoomUser> reciverUsers;
		private Date messageTimestamp;
		private Long senderUserId;
		private Long reciverUserId;
	}
	
	@Data
	public class ChatRoomUser{
		private MessageStatusEnum messageStatus;
		private UserModle user;
	}
}
