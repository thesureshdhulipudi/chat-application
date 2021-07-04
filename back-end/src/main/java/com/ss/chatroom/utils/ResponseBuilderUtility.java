package com.ss.chatroom.utils;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ss.chatroom.model.ResponseModel;

public class ResponseBuilderUtility {

	private ResponseBuilderUtility() {
	}

	public static ResponseEntity<ResponseModel> buildEntityResponse(Integer statusCode, Object data, String msg,
			boolean isCreated) {

		ResponseModel response = new ResponseModel();
		HttpStatus responseHttpStatus = isCreated ? HttpStatus.CREATED : HttpStatus.OK;

		response.setDescription(msg);
		response.setResult(data != null ? data : new ArrayList<>());
		statusCode = statusCode == null ? -1 : statusCode;
		response.setStatusCode(statusCode);
		switch (statusCode) {
		case ChatRoomConstants.SUCCESS:
			responseHttpStatus = HttpStatus.OK;
			break;
		case ChatRoomConstants.NOT_FOUND_ERROR_CODE:
			responseHttpStatus = HttpStatus.NOT_FOUND;
			break;
		case ChatRoomConstants.DB_RELATED_ERROR_CODE:
		case ChatRoomConstants.UNKNOWN_ERROR_CODE:
			responseHttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			break;
		default:
			responseHttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			break;
		}
		return new ResponseEntity<>(response, responseHttpStatus);
	}

	public static ResponseEntity<ResponseModel> buildEntityResponse(int statusCode, Object data, String msg) {
		return buildEntityResponse(statusCode, data, msg, false);
	}
}
