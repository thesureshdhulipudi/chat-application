package com.ss.chatroom.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class ChatRoomMessageRecevierPK implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2978264615192088432L;
	private Long recevierUserId;
//	@Column(name = "chat_room_message_id")
//	private Long chatRoomMessageId;
	

}
