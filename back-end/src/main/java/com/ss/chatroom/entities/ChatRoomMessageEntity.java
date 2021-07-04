package com.ss.chatroom.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "chat_room_message")
public class ChatRoomMessageEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String message;
	private Long senderUserId;
	private Date messageTimestamp;

	@ManyToOne
	@JoinColumn(name = "chat_room_id", nullable = false)
	private ChatRoomEntity chatRoom;

	@OneToMany(mappedBy = "chatRoomMessageEntity")
//    @JoinColumn(name = "chat_room_message_id", referencedColumnName = "id")
	private List<ChatRoomMessageRecevierEntity> chatRoomMessageReceviers;
	

}
