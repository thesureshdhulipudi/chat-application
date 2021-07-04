package com.ss.chatroom.model;

import java.util.Date;

import com.ss.chatroom.entities.UserStatusEnum;

import lombok.Data;

@Data
public class UserModle {
	private Long id;
	private String userId;
	private String firstName;
	private String lastName;
	private Date createdTimestamp;
	private Date lastLoginTimestamp;
	private String avatarUrl;
	private String description;
	private UserStatusEnum status;
}
