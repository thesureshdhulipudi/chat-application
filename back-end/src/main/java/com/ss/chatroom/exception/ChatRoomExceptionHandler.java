package com.ss.chatroom.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.ss.chatroom.model.ResponseModel;
import com.ss.chatroom.utils.ChatRoomConstants;
import com.ss.chatroom.utils.ResponseBuilderUtility;

@ControllerAdvice
public class ChatRoomExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(Exception.class)
	public final ResponseEntity<ResponseModel> handleAllExceptions(Exception ex, WebRequest request) {
		ex.printStackTrace();
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.UNKNOWN_ERROR_CODE, null, ChatRoomConstants.UNKNOW_ERROR_MSG + ex.getMessage());
	}

	@ExceptionHandler(DataAccessException.class)
	public final ResponseEntity<ResponseModel> handleDatabaseException(DataAccessException ex, WebRequest request) {
		ex.printStackTrace();
		return ResponseBuilderUtility.buildEntityResponse(ChatRoomConstants.DB_RELATED_ERROR_CODE, null, ex.getMessage());
	}
	
	@ExceptionHandler(DuplicateRecordFoundException.class)
	public final ResponseEntity<ResponseModel> handleDuplicateRecordFoundException(DuplicateRecordFoundException ex, WebRequest request) {
		ex.printStackTrace();
		return ResponseBuilderUtility.buildEntityResponse(ex.getCode(), null, ex.getMessage());
	}
	
	@ExceptionHandler(DataNotFoundException.class)
	public final ResponseEntity<ResponseModel> handleDataNotFoundExceptionException(DataNotFoundException ex, WebRequest request) {
		ex.printStackTrace();
		return ResponseBuilderUtility.buildEntityResponse(ex.getCode(), null, ex.getMessage());
	}
	
	@ExceptionHandler(MessageSentFailedException.class)
	public final ResponseEntity<ResponseModel> handleMessageSentFailedException(MessageSentFailedException ex, WebRequest request) {
		ex.printStackTrace();
		return ResponseBuilderUtility.buildEntityResponse(ex.getCode(), null, ex.getMessage());
	}

}
