package com.ss.chatroom.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ss.chatroom.entities.ChatRoomMessageRecevierEntity;

@Repository
public interface ChatMessageRecevierRepo extends CrudRepository<ChatRoomMessageRecevierEntity,Long>{

//	List<ChatRoomMessageRecevierEntity> findByChatRoomMessageId(Long id);


}
