package com.ss.chatroom.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ss.chatroom.entities.UserEntity;

@Repository
public interface UserRepo extends CrudRepository<UserEntity,Long>{

	Optional<UserEntity> findByUserId(String userId);

	Optional<UserEntity> findByUserIdAndPassword(String userId, String password);

	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "select chat_id from chat_message where sender_user_id=:senderUserId and recevier_user_id=:recipientUserId")
	List<String> checkIsChatIsExitsWithUsers(Long senderUserId, Long recipientUserId);

}
