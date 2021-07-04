package com.ss.chatroom.model;

import lombok.Data;

@Data
public class ChatMessageModel {
   private String chatId;
   private Long senderId;
   private Long recipientId;
   private String content;
}
