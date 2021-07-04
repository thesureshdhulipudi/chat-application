package com.ss.chatroom.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ss.chatroom.entities.ChatMessageEntity;

@Repository
public interface ChatMessageRepo extends CrudRepository<ChatMessageEntity,Long>{

	List<ChatMessageEntity> findBySenderUserIdOrRecevierUserId(Long userId, Long userId2);

}
