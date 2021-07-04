package com.ss.chatroom.entities;

import java.io.Serializable;
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
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class UserEntity implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String userId;
	private String password;
	private String firstName;
	private String lastName;
	private Date createdTimestamp;
	private Date lastLoginTimestamp;
	private String avatarUrl;
	private String description;
	private UserStatusEnum status;
	
	@ManyToMany(mappedBy = "users")
	private List<ChatRoomEntity> chatRooms;
	
}
