package com.ss.chatroom.model;

import java.util.List;

import lombok.Data;

@Data
public class ChatRoomRequestModel {
	private Long id;
	private String chatRoomName;
	private String chatRoomDescription;
	private List<Long> chatRoomUserIds;
	private Long createdBy;
	private String avatarUrl;

}
