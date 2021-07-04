package com.ss.chatroom.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ss.chatroom.entities.ChatRoomEntity;

public interface ChatRoomRepo extends CrudRepository<ChatRoomEntity, Long>{

	Optional<ChatRoomEntity> findByChatRoomName(String chatRoomName);


}
