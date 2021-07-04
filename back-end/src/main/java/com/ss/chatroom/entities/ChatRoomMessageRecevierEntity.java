package com.ss.chatroom.entities;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "chat_room_message_recevier")
public class ChatRoomMessageRecevierEntity {

//	@Id
//	@EmbeddedId
//	private ChatRoomMessageRecevierPK id;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private MessageStatusEnum messageStatus;
	private Long recevierUserId;
//	@ManyToOne(cascade = CascadeType.ALL)
////	@OneToMany(cascade = CascadeType.ALL)
//	@JoinColumn(name = "chatRoomMessageReceviers")
//    private ChatRoomMessageEntity chatRoomMessageEntity;
	
//	@ManyToOne
//	@JoinColumn(name = "chat_room_message_id")
//	private ChatRoomMessageEntity chatRoomMessageEntity;
	
	@ManyToOne
	@JoinColumn(name = "chat_room_message_id", nullable = false)
	private  ChatRoomMessageEntity chatRoomMessageEntity;

}
