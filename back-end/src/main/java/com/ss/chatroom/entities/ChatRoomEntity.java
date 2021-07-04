package com.ss.chatroom.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "chat_room")
public class ChatRoomEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String chatRoomName;
	private String chatRoomDescription;
	private Date createdTimestamp;
	private String avatarUrl;
	
//	@OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "created_by", referencedColumnName = "id")
	private Long createdBy;

	@ManyToMany(targetEntity = UserEntity.class, cascade = CascadeType.ALL)
	@JoinTable(name = "chat_room_user", joinColumns = @JoinColumn(name = "chat_room_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<UserEntity> users;

	@OneToMany(mappedBy = "chatRoom")
	private List<ChatRoomMessageEntity> chatRoomMessages;

}
