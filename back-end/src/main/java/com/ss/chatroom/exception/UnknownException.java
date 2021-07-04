package com.ss.chatroom.exception;

public class UnknownException extends Exception {

	private static final long serialVersionUID = 7718828512143293558L;

	private final int code;

	public UnknownException(String message, Throwable cause, int code) {
		super(message, cause);
		this.code = code;
	}

	public UnknownException(String message, int code) {
		super(message);
		this.code = code;
	}

	public int getCode() {
		return this.code;
	}
}