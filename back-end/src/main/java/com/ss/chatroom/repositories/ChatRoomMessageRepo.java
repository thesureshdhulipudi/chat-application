package com.ss.chatroom.repositories;

import org.springframework.data.repository.CrudRepository;

import com.ss.chatroom.entities.ChatRoomMessageEntity;

public interface ChatRoomMessageRepo extends CrudRepository<ChatRoomMessageEntity, Long> {

}
