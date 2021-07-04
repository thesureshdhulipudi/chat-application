package com.ss.chatroom.model;

import lombok.Data;

@Data
public class ResponseModel {

	private Integer statusCode;
	private String description;
	private Object result;

}
