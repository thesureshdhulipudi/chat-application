package com.ss.chatroom.exception;

public class MessageSentFailedException extends Exception {

	private static final long serialVersionUID = 7718828512143293558L;

	private final int code;

	public MessageSentFailedException(String message, Throwable cause, int code) {
		super(message, cause);
		this.code = code;
	}

	public MessageSentFailedException(String message, int code) {
		super(message);
		this.code = code;
	}

	public int getCode() {
		return this.code;
	}
}