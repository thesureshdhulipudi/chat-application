package com.ss.chatroom.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;

@Data
@Entity
@Table(name = "chat_message")
public class ChatMessageEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String chatId;
	private String message;
	private MessageStatusEnum messageStatus;
	private Date messageTimestamp;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_user_id", nullable = false)
	private UserEntity senderUser;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recevier_user_id", nullable = false)
	private UserEntity recevierUser;

}
