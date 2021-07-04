package com.ss.chatroom.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class CommonUtils {
	
	public static void main(String[] args) throws ParseException {
		
		System.out.println(UUID.randomUUID()); 
		Date date = new Date();  
	  
	    SimpleDateFormat formatter = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");  
	    String strDate = formatter.format(date); 
	    System.out.println(formatter.parse(strDate));
	}

	public static String generateChatId() {
		return UUID.randomUUID().toString();
	}
	

}
