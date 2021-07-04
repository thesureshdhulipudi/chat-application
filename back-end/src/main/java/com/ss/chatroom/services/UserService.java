package com.ss.chatroom.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ss.chatroom.entities.ChatMessageEntity;
import com.ss.chatroom.entities.UserEntity;
import com.ss.chatroom.exception.DataNotFoundException;
import com.ss.chatroom.exception.DuplicateRecordFoundException;
import com.ss.chatroom.model.UserSignInModel;
import com.ss.chatroom.repositories.UserRepo;
import com.ss.chatroom.utils.ChatRoomConstants;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepo userRepo;

	public List<UserEntity> createUser(UserEntity userEntity) throws DuplicateRecordFoundException {
		if(userRepo.findByUserId(userEntity.getUserId()).isPresent()) {
			throw new DuplicateRecordFoundException("User Id: "+userEntity.getUserId()+" already exits",ChatRoomConstants.DUPLICATE_RECORD_ERROR_CODE);
		}
		userEntity.setCreatedTimestamp(new Date());
		userEntity.setLastLoginTimestamp(new Date());
		UserEntity userRes = userRepo.save(userEntity);	
		List<UserEntity> userEntities = new ArrayList<>();
		userEntities.add(userRes);
		return userEntities;
	}

	public List<UserEntity> getUsers(String userId) {
		List<UserEntity> userEntities = new ArrayList<>();
		Optional<UserEntity> userEntity = null;
		if (userId != null) {
			userEntity = getUserByUserIdorId(userId);
			if(userEntity.isPresent()) {
				userEntities.add(userEntity.get());
			}
		} else {
			userEntities = (List<UserEntity>) userRepo.findAll();
		}
		userEntities.forEach(user->{
			user.setChatRooms(null);
		});
		return userEntities;
	}

	public Optional<UserEntity> getUserByUserIdorId(String userId) {
		Optional<UserEntity> userEntity;
		if (userId instanceof String) {
			userEntity = userRepo.findByUserId(userId);
		} else {
			userEntity = userRepo.findById(Long.valueOf(userId));
		}
		return userEntity;
	}
	
	public Optional<UserEntity> getUserById(Long userId) {
		return userRepo.findById(userId);
	}

	public List<UserEntity> signIn(UserSignInModel userSignInModel) throws DataNotFoundException {
		List<UserEntity> userEntities = new ArrayList<>();
		Optional<UserEntity> userEntity = userRepo.findByUserIdAndPassword(userSignInModel.getUserId(),userSignInModel.getPassword());
		if(!userEntity.isPresent()) {
			throw new DataNotFoundException(null, 0);
		}
		userEntities.add(userEntity.get());
		userEntities.forEach(user->{
			user.setChatRooms(null);
		});
		return userEntities;
	}

	public List<String> checkIsChatIsExitsWithUsers(Long senderId, Long recipientId) {
		return userRepo.checkIsChatIsExitsWithUsers(senderId,recipientId);
	}

	public List<UserEntity> getUsersByIds(List<Long> ids){
		return (List<UserEntity>) userRepo.findAllById(ids);
	}
	
}
